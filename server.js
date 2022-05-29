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

// CREATE a ToDo task --- POST Route
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

// Update a Todo task --- PUT Route
app.put("/todo/update", (req, res) => {
    // Get the existing todo data
    const existingTodos = getTodosData();

    console.log(`existingTodos: ${JSON.stringify(existingTodos)}`);
    
    //Get the new todo task from the POST request object.
    console.log(`req: ${req}`);
    const todoData = req.body;

    console.log(`todoData: ${JSON.stringify(todoData)}`);

    // Incoming data validation
    if(todoData.title === null || todoData.description === null) {
        return res.status(401).send({error: true, msg: 'Todo Data missing'});
    }
    
    // Check whether the request Todo exists in Todos.JSON
    existingTodos.find(todo => {
        if(todo.title === todoData.title) {
            todo.description = todoData.description;
        }
    })
    console.log(JSON.stringify(existingTodos));

    // Save the new todos to the JSON file
    saveTodosData(existingTodos);
    console.log('Successfully updated Todo');
    res.send({success: true, msg: 'Todo data updated successfully'});
})

// Delete a Todo task --- DELETE Route
app.delete("/todo/delete", (req, res) => {
    // Get the existing todo data
    const existingTodos = getTodosData();

    console.log(`existingTodos: ${JSON.stringify(existingTodos)}`);
    
    //Get the new todo task from the POST request object.
    console.log(`req: ${req}`);
    const todoData = req.body;

    console.log(`todoData: ${JSON.stringify(todoData)}`);

    // Incoming data validation
    if(todoData.title === null || todoData.description === null) {
        return res.status(401).send({error: true, msg: 'Todo Data missing'});
    }
    
    // Filter the todo which you don't want to delete
    const newListOfTodos = existingTodos.filter(todo => todo.title !== todoData.title)
    console.log(`newListOfTodos: ${JSON.stringify(newListOfTodos)}`);

    // Save the new todos to the JSON file
    saveTodosData(newListOfTodos);
    //console.log('Successfully updated Todo');
    res.send({success: true, msg: 'Todo data deleted successfully'});
})

// Configure server PORT and start server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log('listening to 8001');
})