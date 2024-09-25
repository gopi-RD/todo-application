const mongoose=require("mongoose");

const todoSchema=new mongoose.Schema({
      user_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
      }, 
      name:{
        type:String,
        required:true
      },
      status:{
        type:String,
        default:"Pending"
      }
}
 ,{timestamps:true}

);

const Todos= mongoose.model("Todo",todoSchema)

module.exports=Todos

