const mongoose=require('mongoose')

const {Schema}=mongoose

const Userschema= new Schema({
    name: {
        type: String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true
    },
    mobile:{
        type:Number,
        required:true
    },
    code:{
        type:Number
    }
})
module.exports=mongoose.model('userlogin',Userschema)