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
