require("dotenv").config();
const  mongoose  =  require('mongoose');

// const uri = process.env.MongoURL || 'mongodb://localhost:8000' ;
const uri = process.env.MongoURL || 'mongodb://localhost:27017/shopping_app'
// mongoose.set('bufferCommands', false);

module.exports = async() =>{
    await mongoose.connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(x => {
        console.log(
          `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
      })
      .catch(err => {
        console.error("Error connecting to mongo", err);
      });
     return mongoose;
}