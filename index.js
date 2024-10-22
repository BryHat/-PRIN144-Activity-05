const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {//port
    console.log(`Server is running on port ${PORT}`);
});

const tasks = [{ id: 1, name: "Task", isDone: false }, { id: 2, name: "Task2", isDone: false }];
let taskId = tasks.length;
// http://localhost:3000/tasks or http://localhost:3000/tasks?name=task2
// either get all or query string 
app.get('/tasks', (request, response) => {
    const { name } = request.query;
    if (name) {
        const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(name.toLowerCase()));
        response.json(filteredTasks);
    } else {
        response.json(tasks);
    }
});

// http://localhost:3000/tasks/1
// get specific item details
app.get('/tasks/:id', (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));
    
    if (task) {
        response.json(task);
    } else {
        response.status(404).send('Task not found');
    }
});

// http://localhost:3000/tasks
// will push and create new task
app.post('/tasks', (request, response) => {
    taskId++;
    request.body.id = taskId;
    request.body.isDone = false;
    tasks.push(request.body);
    response.status(201).json();
});

// http://localhost:3000/tasks/:id
// Request Body:
// {
//     "name": "Task3"
// }
app.put('/tasks/:id', (request, response) => {
    const id = request.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...request.body };
        response.json(tasks[taskIndex]);
    } else {
        response.status(404).send('Task not found');
    }
});


// http://localhost:3000/tasks/:id
// Request Body:
// {
//     "name": "new name task 2",
//     "isDone": true
// }
app.patch('/tasks/:id', (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));
    
    if (task) {
        Object.assign(task, request.body);
        response.json(task);
    } else {
        response.status(404).send('Task not found');
    }
});


// http://localhost:3000/tasks/:id
// deletes specific id
app.delete('/tasks/:id', (request, response) => {
    const id = request.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        response.status(204).send();
    } else {
        response.status(404).send('Task not found');
    }
});