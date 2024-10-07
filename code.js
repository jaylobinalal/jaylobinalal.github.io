// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const WONDE_API_BASE = 'https://api.wonde.com/v1.0/schools/A1417790266';
const API_TOKEN = process.env.WONDE_API_TOKEN;

app.get('/students', async (req, res) => {
    try {
        const response = await axios.get(`${WONDE_API_BASE}/students`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching students');
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const response = await axios.get(`${WONDE_API_BASE}/students/${req.params.id}?include=attendance_summary,achievements,behaviours`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching student details');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
