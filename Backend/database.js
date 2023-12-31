const mongoose=require('mongoose')
const mongooseURI='mongodb://127.0.0.1:27017/Login'
const connecttomongo=()=>{
    mongoose.connect(mongooseURI,console.log("You have been Successfully Connected with DoorPoint at MongoDB"))

}
module.exports=connecttomongo;