const express = require('express');

const app = express();
app.use(express.json());

app.post('/riddle', async (req, res) => {
    const { riddle } = req.body;
    
    if (!riddle) return res.status(400).json({ error: 'No riddle provided' });

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192',
                max_tokens: 50,
                messages: [{
                    role: 'user',
                    content: `Answer this riddle with ONLY the answer word or short phrase, nothing else: "${riddle}"`
                }]
            })
        });

        const data = await response.json();
        const answer = data.choices[0].message.content.trim();
        res.json({ answer });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
