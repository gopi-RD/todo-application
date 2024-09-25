const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Todo"
        }
    ]

    
})

const User= mongoose.model("User",userSchema)

module.exports=User;