const mongoose= require("mongoose");

const todoSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        content:{
            type: String,
        },
    },
    { timestamps: true}
);

module.exports = mongoose.model("todos", todoSchema);