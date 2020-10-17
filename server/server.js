const express = require('express');
const morgan = require('morgan');
const dao = require('./dao.js');

const PORT = 3001;
app = new express();
// Logger
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('client'));

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));


app.get('/', (req, res) => {
    res.json({
        "response": "ok"
    });
});

// REST API endpoints

// Resources: Counters, Request_type

// GET /counters
// Request body: empty
// Response body: Array of objects, each describing a Counter
// Errors: none
app.get('/counters', (req, res) => {
    dao.listCounters()
      .then((counters) => res.json(counters) )
      .catch((err)=>res.status(503).json(dbErrorObj));
  });

  // GET /request type
// Request body: empty
// Response body: Array of objects, each describing a Request_type
// Errors: none
app.get('/request_type', (req, res) => {
    dao.listRequests()
      .then((requests) => res.json(requests) )
      .catch((err)=>res.status(503).json(dbErrorObj));
  });