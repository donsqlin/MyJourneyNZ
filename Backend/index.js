const express = require('express');
const { Loader } = require('@googlemaps/js-api-loader');
require('dotenv').config();

const apikey = process.env.VITE_GOOGLE_MAP_API_KEY;

const loader = new Loader({
  apiKey: apikey
});

const app = express();
const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:5173/', // Allow requests from all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'], // Add this line
  credentials: true, // Add this line
  referrerPolicy: 'strict-origin-when-cross-origin' // Add this line
}));

app.get('/map', async (req, res) => {
  try {
    await loader.load();
    const { Map } = await google.maps.importLibrary('maps');

    const map = new Map(document.getElementById('map'), {
      zoom: 11,
      center: { lat: -36.880184, lng: 174.754739 },
    });

    res.json({ mapData: map });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load map' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});