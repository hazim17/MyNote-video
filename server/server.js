const express = require('express');
const app = express();
const API_PORT = process.env.port || 8080

app.use(express.json())

app.get("/:name", (req, res) => {
    res.send(`Hello, ${req.params.name}`)
})

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))
