// index.js
require('dotenv').config();

// Import required modules
const express = require('express');

// Initialize Express
const app = express();
const port = 3000; // Define the port number for your server

// Initialise TomTom API 

const apiKey = process.env.VITE_APP_TOMTOM_API_KEY;

const routeOptions = {
  key: apiKey,
  locations: '52.37,4.90:51.92,4.46',
  language: 'en-GB',
  instructionsType: 'text'
};

// Define a route
app.get('/', (req, res) => {
  fetch(`https://api.tomtom.com/routing/1/calculateRoute/${routeOptions.locations}/json?key=${routeOptions.key}&instructionsType=${routeOptions.instructionsType}&language=${routeOptions.language}`)
  .then(response => response.json())
  .then(data => {
    // Process the route data
    //const route = data.routes[0];
    res.send(data);
    // Use the route information to display on the map
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});