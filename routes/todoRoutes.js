
const express=require("express");
const todoController=require("../controller/todoController")
const verifyToken=require("../middleware/verifyToken")
const router=express.Router()

router.post("/todos",verifyToken,todoController.addTodos) 
router.get("/todos",verifyToken,todoController.getAllTodos)
router.get("/todos/:todoId",verifyToken,todoController.getTodo)
router.put("/todos/:todoId",verifyToken,todoController.updateTodo)
router.delete("/todos/:todoId",verifyToken,todoController.deleteTodo)

module.exports=router;