const express = require('express');
const morgan = require('morgan');

const PORT = 3001;
app = new express();
// Logger
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('client'));

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));

app.get('/api/test', (req, res) => {
    res.json({
        "response": "ok"
    });
});