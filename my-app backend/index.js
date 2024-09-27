const express= require("express");
const mongoose= require("mongoose");
const cors= require("cors");
const dotenv=require('dotenv').config();
const {addTodo,
    getTodoList,
    deleteTodo
}=require("./controllers/todo.controller")
const app=express();
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
app.post('/add',addTodo);

app.get('/list',getTodoList);

app.delete('/delete/:id',deleteTodo);

app.get('/',(req,res)=>{
    res.send("HERE")
})
const port=process.env.PORT || 7000
app.listen(port, ()=>{
    console.log("Server is running...")
})
