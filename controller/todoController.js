
const todoModel=require("../models/Todo")
const user=require("../models/User") 

const addTodos=async (request,response)=>{
    const {user_id,name,status}=request.body 
    try{
    const userDetails=await user.findById(request.user_id)
    if (!userDetails){
        response.status(404).json({error_msg:"User Not Found"})
    }
    const todo=new todoModel({
       name,status, user_id:userDetails._id
    })
    const savedTodo=await todo.save()
    userDetails.todos.push(savedTodo)
    await userDetails.save()
    response.status(200).json({message:"Todo Added in Todo-List"})

    }
    catch(error){

        response.status(500).json({error_msg:`Internal server Error is ${error}`})

    }
}

const getAllTodos=async(request,response)=>{
    try{
        const todos=await todoModel.find({user_id:request.user_id})
        response.json(todos)
    }catch(error){
        response.status(500).json({error_msg:`Internal server Error is ${error}`})
    }
}

const getTodo=async(request,response)=>{
    const {todoId}=request.params 
    try {
        const todo=await todoModel.findById(todoId)
        if (!todo){
            response.status(404).json({error_msg:"User Not Found"})
        }
        response.status(200).json(todo)
    } catch (error) {
        response.status(500).json({error_msg:`Internal Server error is ${error}`}) 
    }
}


const updateTodo=async(request,response)=>{
    const {todoId}=request.params 
    const {name,status}=request.body 
    try {
        const todo=await todoModel.findByIdAndUpdate({_id:todoId},{name,status})
        if (!todo){
            response.status(404).json({error_msg:"Todo Not Found"})
        }
        
        response.status(200).json({message:"Updated Successfully"})

    } catch (error) {
        response.status(500).json({error_msg:`Internal Server error is ${error}`}) 
        
    }
}


const deleteTodo=async(request,response)=>{
    const todoId=request.params.todoId 
    try {
        const todo=await todoModel.findByIdAndDelete(todoId)
        if (!todo){
            response.status(404).json({error_msg:"Todo Not Found"})
        }
        response.status(200).json({message:"Todo Item Deleted Successfully"})
    } catch (error) {
        response.status(500).json({error_msg:`Internal Server error is ${error}`}) 
    }

}

module.exports={addTodos,getAllTodos,getTodo,updateTodo,deleteTodo};