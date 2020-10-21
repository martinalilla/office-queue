
const request = require('supertest');
const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const Request_type = require('../request_type');

let should = chai.should();
chai.use(chaiHttp);


//TEST GET ALL REQUEST_TYPE
describe('request_type_testing', ()=>{

    describe('/request_type', () => {
        it('it should GET all the request_types', (done) => {
          chai.request(app)
              .get('/request_type')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(6);
                done();
              });
        });

    });
});

/*
  * Test the //GET service_time  /request_type/<tag_name> 
  //Get the service time of a request_type
  */
 describe('/GET/api/request_type/:tag_name', () => {
    it('it should GET the service_time="00:10:00" by the given tag_name="shipping"', (done) => {
        let tag_name = "shipping";
            chai.request(app)
          .get("/api/request_type/"+tag_name)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('string');
                res.body.should.be.eql("00:10:00")
            done();
          });

    });
});

/*
  * Test the /POST 
  //POST /request_type
  //create a new request_type
  */
 describe('/POST request_type', () => {
    it('it should not POST a request_type without service_time', (done) => {
        let request = {
            tag_name : "new_request_type"
        }
      chai.request(app)
          .post('/api/request_type')
          .send(request)
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    });
});

/*
  * Test the /POST 
  //POST /request_type
  //create a new request_type
  */
 describe('/POST request_type', () => {
  it('it should  POST a request_type with tag_name="testing"', (done) => {
      let request = {
          tag_name : "testing",
          service_time: "00:00:00"
      }
    chai.request(app)
        .post('/api/request_type')
        .send(request)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('id').eql(8);
          done();
        });
  });
});

/*
  * Test the /DELETE/request_type/:tag_name
  */
  describe('/DELETE/request_type/:tag_name', () => {
      it('it should DELETE a request_type with tag name "testing" ', (done) => {
                let tag_name = "testing";
                chai.request(app)
                .delete('/api/request_type/' + tag_name)
                .end((err, res) => {
                      res.should.have.status(204);
                      res.body.should.be.a('object');
                      //res.body.should.have.property('message').eql('Request_type deleted');
                  done();
                });
      });
  });

  /*
  * Test the /PUT/
  //PUT /request_type/<tag_name>
//Update the service time of an existing request_type with a given tag_name.
  */
 describe('/PUT/request_type/:tag_name', () => {
  it('it should UPDATE the service time given the tag name', (done) => {
            let tag_name = "shipping"
            chai.request(app)
            .put('/api/request_type/' + tag_name)
            .send({service_time : "00:11:00"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Service_time updated');
              done();
            });
  });
});

 /*
  * Test the /PUT/
  //PUT /request_type/<tag_name>
//Update the service time of an existing request_type with a given tag_name.
  */
 describe('/PUT/request_type/:tag_name', () => {
  it('it should UPDATE the service time given the tag name', (done) => {
            let tag_name = "shipping"
            chai.request(app)
            .put('/api/request_type/' + tag_name)
            .send({service_time : "00:10:00"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Service_time updated');
              done();
            });
  });
});

 /*
  * Test the /PUT/
  //PUT /change/request_type/<tag_name>
//Change the tag_name of an existing request_type with a given tag_name.
  */
 describe('/PUT/request_type/change/:tag_name', () => {
  it('it should CHANGE the tag_name of a given request_type', (done) => {
            let tag_name = "shipping"
            chai.request(app)
            .put('/api/request_type/change/' + tag_name)
            .send({tag_name : "test"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Tag_name changed');
              done();
            });
  });
});

/*
  * Test the /PUT/
  //PUT /change/request_type/<tag_name>
//Change the tag_name of an existing request_type with a given tag_name.
  */
 describe('/PUT/request_type/change/:tag_name', () => {
  it('it should CHANGE the tag_name of a given request_type', (done) => {
            let tag_name = "test"
            chai.request(app)
            .put('/api/request_type/change/' + tag_name)
            .send({tag_name : "shipping"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Tag_name changed');
              done();
            });
  });
});