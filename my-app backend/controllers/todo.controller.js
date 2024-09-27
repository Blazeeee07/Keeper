const mongoose =require("mongoose");
const todoModel= require("../models/todo.model")


const addTodo=async (req,res)=>{
        const task=req.body;
        try {
            const newTodo=todoModel.create({
                title:task.title,
                content:task.content
            })
            res.status(201).send(newTodo)
        } catch (error) {
            res.status(400).send(error.message);
        }
}

const getTodoList=async (req,res)=>{
    console.log("")
    try{
        const allTodos = await todoModel.find().sort({createdAt: -1});
        res.status(200).send(allTodos);
    }catch(error){
        res.status(400).send(error.message);
    }
}

const deleteTodo=async(req, res) => {
    const {id} =req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send(`There is no todo with the id of ${id}`)
        }
        await todoModel.findByIdAndDelete({_id:id})        
        res.status(201).send("Deleted Successfully");
    } catch (error){
        res.status(500).send(error.message);
    }
}

module.exports={
    addTodo,
    getTodoList,
    deleteTodo
}