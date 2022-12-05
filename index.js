const { request, response } = require('express');
const express = require('express')
const app = express()
const { Todo } = require('./models')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/todos', (request, response) => {
    response.send("Hello world");
    console.log("Todo List");
})

app.post('/todos', async (request, response) => {
    console.log("Creating a todo");
    try {
        const todo = await Todo.addTodo({ title: request.body.title, dueDate: request.body.dueDate, completed: false })
        return response.json(todo)
    } catch (error) {
        console.log(error);
        return response.status(422).json(error)
    }
})

app.put('/todos/:id/markAsCompleted', async (request, response) => {
    //response.send("Hello world");
    console.log("Complete a todo with id:", request.params.id);
    const todo = await Todo.findByPk(request.params.id)
    try {
        const updatedTodo = await todo.markAsCompleted()
        return response.json(updatedTodo)
    } catch (error) {
        console.log(error);
        return response.status(422).json(error)
    }
})

app.delete('/todos/:id', (request, response) => {
    console.log("Delete a todo by id:", request.params.id);
})



app.listen(3000, () => {
    console.log("Started express server on port 3000");
})