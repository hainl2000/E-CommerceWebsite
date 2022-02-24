var app = require('./app');
var server = require("http").Server(app);
var io = require('socket.io')(server);
const AccountModel = require('./models/user');
const jwt = require("jsonwebtoken");
const roomController = require('./controllers/room');
const messageController = require('./controllers/message');

// io.engine.generateId = function (req) {
//     // generate a new custom id here
//     let userId = jwt.verify(req.cookies.userId,process.env.JWT_KEY);
//     return userId
// }

io.on("connection", function(socket){
    var cookies = cookie.parse(socket.handshake.headers.cookie);
    let userId = jwt.verify(cookies.userId,process.env.JWT_KEY);
    // var userId = cookies.userId;
    let user = AccountModel.findOne({
        _id : userId
    });

    AccountModel.findOne({_id: userId}).then(response => {
        if(response)
        {
            socket.io.engine.id = response._id;
            socket.emit('connected')
        }
    })
    // io.engine.generateId = function (req) {
    // // generate a new custom id here
    // return 1
    // }

    socket.on('join',async(data)=>{

    })
    socket.on('loadMsg',async (data) => {
        const {Msgs, error} = await roomController.loadMessages(data.roomId);
        !error ? socket.emit('messagesLoaded', { Msgs }) : socket.emit('noChatFound')
        // if(user.role == 1){
            
        // }
        
    })

    socket.on('sendNewMsg', async ({ data }) =>
    {
      const { newMsg, error } = await sendMsg(data.userId, data.roomId , data.msg)
    //   const receiverSocket = findConnectedUser(msgSendToUserId)
  
    //   if(receiverSocket)
    //   {
    //     io.to(receiverSocket.socketId).emit('newMsgReceived', { newMsg })
    //   }
    //   else
    //   {
    //     await setMsgToUnread(msgSendToUserId)
    //   }
        io.to(data.userId).emit("newMsgReceived",{newMsg});
      !error && socket.emit('msgSent', { newMsg });
    })
});

module.exports = io;
