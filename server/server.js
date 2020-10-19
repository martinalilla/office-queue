const express = require('express');
const morgan = require('morgan');
const dao = require('./dao.js');
const request_type_dao = require('./request_type_dao.js')

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

  //GET service_time  /request_type/<tag_name> 
app.get('/api/request_type/:tag_name', (req, res) => {
    request_type_dao.get_service_time(req.params.tag_name)
        .then((service_time) => {
            if(!service_time){
                res.status(404).send();
            } else {
                res.json(service_time);
            }
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'param': 'Server', 'msg': err}],
            });
        });
});

  //POST /tasks
app.post('/api/request_type', (req,res) => {
    const request_type = req.body;
    if(!request_type){
        res.status(400).end();
    } else {
        request_type_dao.create_request_type(request_type)
            .then((id) => res.status(201).json({"id" : id}))
            .catch((err) => {
                res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
            });
    }
});

//DELETE /request_type/<tag_name>
app.delete('/api/request_type/:tag_name', (req,res) => {
    request_type_dao.delete_request_type(req.params.tag_name)
        .then((result) => res.status(204).end())
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});

//PUT /request_type/<tag_name>
app.put('/api/request_type/:tag_name', (req,res) => {
    if(!req.body.service_time){
        res.status(400).end();
    } else {
        const service_time = req.body.service_time;
        request_type_dao.update_request_type(req.params.tag_name,service_time)
            .then((result) => res.status(200).end())
            .catch((err) => res.status(500).json({
                errors: [{'param': 'Server', 'msg': err}],
            }));
    }
});