const express = require("express");
const fs = require("fs");

const app = express();

// Parse the request body, earlier, we used to do body-parser.json() but latest versions of express contains this functionality so we can use express.json()
app.use(express.json());

// Test the app to check it works
/* app.get("/", (req, res) => {
    const output = { value: "hello world!" }
    res.send(output);
}) */

// Utility functions to read and write from file

// Write data to todos.json
const saveTodosData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync('todos.json', stringifyData);
}

// Read data from todos.json
const getTodosData = () => {
    const jsonData = fs.readFileSync('todos.json');
    return JSON.parse(jsonData);
}

// END utility functions

// Read all ToDos --- GET Route
app.get('/todo/list', (re, res) => {
    const todos = getTodosData();
    console.log(todos);
    res.send(todos);
})

// CREATE a ToDo task --- POST ROUTE
app.post('/todo/add', (req, res) => {
    // Get the existing ToDos so that we don't loose the current data
    const existingTodos = getTodosData();
    console.log(`existingTodos: ${existingTodos}`);
    
    //Get the new todo task from the POST request object.
    console.log(`req: ${req}`);
    const todoData = req.body;

    console.log(`todoData: ${JSON.stringify(todoData)}`);
    
    // Incoming data validation
    if(todoData.title === null || todoData.description === null) {
        return res.status(401).send({error: true, msg: 'Todo Data missing'});
    }
    
    // Check if the todo exists already - TODO This functionality needs to be implemented
    
    // Update the array by adding the new ToDo
    existingTodos.push(todoData);
    console.log(`Updated existingTodos: ${JSON.stringify(existingTodos)}`);
    
    // Save the new Todo data
    saveTodosData(existingTodos);

    // Redirect to the page to show the updated Todos
    console.log("Todo added successfully");
    res.send({success: true, msg: 'Todo data added successfully'});
})

// Configure server PORT and start server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log('listening to 8001');
})