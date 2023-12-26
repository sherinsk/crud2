mongoose=require('mongoose')

schema=new mongoose.Schema({name:String,age:Number})

module.exports=mongoose.model('student',schema)