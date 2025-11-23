<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const app = express();

// Body parsing middleware
app.use(express.json());

let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build CRUD API', completed: false }
];

app.get('/todos', (req, res) => {
    // Remove any trailing whitespace/newline from path
    if (req.path.trim() === '/todos') {
        res.status(200).json(todos);
    } else {
        res.status(404).send('Not found');
    }
});


// GET single todo by ID  
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
});

// POST create a todo + validation  
app.post('/todos', (req, res) => {
    if (!req.body.task) {
        return res.status(400).json({ error: "Task field is required" });
    }

    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PATCH update a todo
app.patch('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    Object.assign(todo, req.body);
    res.status(200).json(todo);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;

    todos = todos.filter(t => t.id !== id);

    if (todos.length === initialLength) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(204).send();
});

// BONUS: GET active todos (completed = false)  
app.get('/todos/active', (req, res) => {
    const activeTodos = todos.filter(t => t.completed === false);
    res.status(200).json(activeTodos);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
=======
const express = require('express');
const app = express();
app.use(express.json()); // Parse JSON bodies

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET All – Read
app.get('/todos', (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});

// POST New – Create
app.post('/todos', (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body }; // Auto-ID
  todos.push(newTodo);
  res.status(201).json(newTodo); // Echo back
});

// PATCH Update – Partial
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  Object.assign(todo, req.body); // Merge: e.g., {completed: true}
  res.status(200).json(todo);
});

// DELETE Remove
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: 'Not found' });
  res.status(204).send(); // Silent success
});

app.get('/todos/completed', (req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.json(completed); // Custom Read!
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!' });
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
>>>>>>> 562bfc95d2e798b1a0dd0257c55cdd21763c64f6
