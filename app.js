require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

let todos = [];
let nextId = 1;

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Get active todos
app.get("/todos/active", (req, res) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  res.json(activeTodos);
});

// Get completed todos
app.get("/todos/completed", (req, res) => {
  const completedTodos = todos.filter(todo => todo.completed);
  res.json(completedTodos);
});

// Get todo by id
app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

// Add a new todo
app.post("/todos", (req, res) => {
  const { task, completed } = req.body;
  if (!task) return res.status(400).send("Task is required");

  const todo = { id: nextId++, task, completed: completed || false };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");

  const { task, completed } = req.body;
  if (task !== undefined) todo.task = task;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Todo not found");

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
