const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // PORT

app.get('/', (req, res) => {
    res.send('hehe');
})

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
})

app.get('/api.cources/:year/:month', (req, res) => {
    res.send(req.params);
})


app.listen(port, () => console.log(`Listening on port ${port}...`));
