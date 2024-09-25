
const express=require("express");
const app=express();
let mongoose=require("mongoose")
const dotEnv=require("dotenv");
const userRouter=require("./routes/userRoutes");
const todoRouter=require("./routes/todoRoutes");
const cors=require("cors")
const PORT= process.env.PORT || 3000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected to Mongodb"))
.catch((error)=>console.log(error));
app.use(cors())
app.use(express.json())

app.use("/user-details",userRouter) 
app.use("/todo-list",todoRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)

})

app.get("/",async (request,response)=>{ 
    response.send("Welcome to Todo Application")

})
