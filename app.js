var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var cookie = require('cookie')

var app = express();

var http = require('http')
const server = app.listen(8000, () => console.log(`Running on port 8000`))
var socket = require('socket.io');

const io = socket(server)

// io.listen(server)
const jwt = require("jsonwebtoken");
const AccountModel = require('./models/user');
const roomController = require('./controllers/room');
const msgController = require('./controllers/message');
const roomAction = require('./action/roomAction');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var roomRouter = require('./routes/room');
var authorizationMiddleware = require('./validate/authorizationAccount');

const mongo = require('./mongo');
mongo();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.engine('html', require('jade').renderFile);
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//CORS
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

//
app.use('/', indexRouter);
app.use('/chat',roomRouter);
app.use('/user', authorizationMiddleware.authorizeUser,userRouter);
app.use('/admin', authorizationMiddleware.authorizeAdmin,adminRouter);
app.use('/room', roomRouter)
// app.use('/supporter');



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

io.on("connection", function(socket){
    if(socket.handshake.headers.cookie)
    {
        var cookies = cookie.parse(socket.handshake.headers.cookie);
        // console.log('cookie:   ', cookies);
        var userId = jwt.verify(cookies.userId,process.env.JWT_KEY);
        // console.log(userId.userId);
        socket.on('join', async (data) => {
            const users = await  roomAction.addUser(userId.userId, socket.id);
        })
    }

    const admin = '61b0ee2561089363649b5e4f'
    socket.on('loadMsg',async (data) => {
        console.log(data)
        const Msgs = await roomController.loadMessages(data.roomId);
        socket.emit('messagesLoaded', { Msgs })
        // if(user.role == 1){
            
        // }
        
    })
    // console.log(userId.userId);
    //data = {role, roomId, msg}
    socket.on('sendNewMsg', async (data) =>
    {   

        msgController.sendMsg(data.role === 0 ? data.roomId : userId.userId, userId.userId, data.msg).then(result => {
            socket.emit('msgSent', { result, key: 'aaa' });
            console.log(data.role)
            let receiverSocket = roomAction.findConnectedUser(data.role === 0? data.roomId : admin);
            // console.log(receiverSocket === undefined)
            if(receiverSocket)
            {
                console.log('sent')
                io.to(receiverSocket.socketId).emit('newMsgReceived', { result })
            }
        });
    //   console.log('admin', admin, data.role)
    //   if(data.role === 1)
        // var receiver = roomAction.findConnectedUser(admin);
    //   else
        // var receiver = roomAction.findConnectedUser(data.roomId);
        
        //   if(receiverSocket)
        //   {
            //     io.to(receiver.socketId).emit('newMsgReceived', { newMsg })
            //   }
            //   else
            //   {
                //     await setMsgToUnread(msgSendToUserId)
        //         //   }
        // console.log('msg');
        // console.log(newMsg);
        // console.log('receiver ' . receiver);
        // console.log(newMsg)
        // io.to(receiver.socketId).emit("newMsgReceived",{newMsg, key: 'aaa'});
    //   !error && socket.emit('msgSent', { newMsg, key: 'aaa' });
    })
});

module.exports = app;