const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/todos", async (request, response) => {
  console.log("Todo List");
  try {
    const todo = await Todo.getTodos();
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async (request, response) => {
  console.log("Creating a todo");
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async (request, response) => {
  console.log("Complete a todo with id:", request.params.id);
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async (request, response) => {
  console.log("Delete a todo by id:", request.params.id);
  try {
    const deletedTodo = await Todo.deleteTodo(request.params.id);
    if (deletedTodo == 1) {
      response.send(true);
    } else if (deletedTodo == 0) {
      response.send(false);
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
module.exports = app;
