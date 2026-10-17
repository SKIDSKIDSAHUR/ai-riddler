const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/riddle', async (req, res) => {
    const { riddle } = req.body;
    
    if (!riddle) return res.status(400).json({ error: 'No riddle provided' });

    try {
        const message = await client.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 100,
            messages: [{
