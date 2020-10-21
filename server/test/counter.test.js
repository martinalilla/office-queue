const request = require('supertest');
const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const counter = require('../counter');

let should = chai.should();
chai.use(chaiHttp);



//TEST GET ALL COUNTERS
describe('counters_testing', ()=>{

    describe('/counters', () => {
        it('it should GET all the counters', (done) => {
          chai.request(app)
              .get('/counters')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(5);
                done();
              });
        });

    });

// TEST GET ALL THE REQUEST TYPES SERVED BY A COUNTER
    describe('/GET/api/counter/:id', () => {
        it('it should GET all the request types of the counter with id=5', (done) => {
            let id = 5;
                chai.request(app)
              .get("/api/counter/"+id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                  //  res.body.lenght.should.be.eql(1)
                done();
              });
    
        });
    });

    // TEST GET ALL THE COUNTERS THAT SERVE A SPECIFIC REQUEST TYPE
    describe('/GET/api/counters/request/:tag', () => {
        it('it should GET all conters that serve the request type with tag_name=withdrawals', (done) => {
            let tag_name = "withdrawals";
                chai.request(app)
              .get("/api/counters/request/"+tag_name)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                   // res.body.lenght.should.be.eql(2)
                done();
              });
    
        });
    });
    
    
  //TEST POST OF A COUNTER WITHOUT THE ID
    describe('/POST counter', () => {
         it('it should not POST a counter without the id', (done) => {
                let counter = {
                request_type : "new_request_type"
           }
        chai.request(app)
            .post('/api/counter')
             .send(counter)
             .end((err, res) => {
                res.should.have.status(400);
                 done();
            });
         });
    });

     //TEST POST OF A COUNTER WITH THE ID
    describe('/POST counter', () => {
         it('it should  POST a counter with id=9', (done) => {
             let counter = {
                id : 9,
                request_type: "test_req_type"
            }
            chai.request(app)
             .post('/api/counter')
                .send(counter)
                .end((err, res) => {
                     res.should.have.status(201);
                     res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(11);
                    done();
                });
        });
     });

     //TEST DELETE COUNTERS WITH A SPECIFIC ID
     describe('/DELETE/counter/:id', () => {
        it('it should DELETE counters with id =7 ', (done) => {
                  let id = 7;
                  chai.request(app)
                  .delete('/api/counter/' + id)
                  .end((err, res) => {
                        res.should.have.status(204);
                        res.body.should.be.a('object');
                       // res.body.should.have.property('message').eql('counter deleted');
                    done();
                  });
        });
    });

     //TEST DELETE COUNTERS WITH A SPECIFIC ID & REQUEST TYPE
     describe('/DELETE/counter/:id/:request', () => {
        it('it should DELETE counters with id =7 ', (done) => {
                  let id = 9;
                  let tag_name = "test_req_type"
                  chai.request(app)
                  .delete('/api/counter/'+ id + '/' +tag_name)
                  .end((err, res) => {
                        res.should.have.status(204);
                        res.body.should.be.a('object');
                      //  res.body.should.have.property('message').eql('counter deleted');
                    done();
                  });
        });
    });


});