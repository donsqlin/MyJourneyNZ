// index.js

// Import required modules
const express = require('express');

// Initialize Express
const app = express();
const port = 3000; // Define the port number for your server

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express with Node.js!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});