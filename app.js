const express = require('express');
const os = require('os');

const app = express();
const port = 80;

app.get('/', (req, res) => {
    const hostname = os.hostname();
    const version = process.env.VERSION || '1.0.0';
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>My App</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #4CAF50; }
                .info { background: #f0f0f0; padding: 20px; border-radius: 10px; }
            </style>
        </head>
        <body>
            <h1>Hello, Yandex Cloud!</h1>
            <div class="info">
                <p><strong>Version:</strong> ${version}</p>
                <p><strong>Hostname:</strong> ${hostname}</p>
                <p><strong>Deployed via:</strong> CI/CD Pipeline</p>
            </div>
        </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`);
});