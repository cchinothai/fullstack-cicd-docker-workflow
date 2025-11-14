//server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// Enable CORS for frontend to connect
app.use(cors());

// Parse JSON req bodies
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.send('Server is running!');
});

//Health check endpoint 
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Backend is healthy!'
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

