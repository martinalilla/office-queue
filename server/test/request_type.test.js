const request = require('supertest');
const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const Request_type = require('../request_type');

let should = chai.should();
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

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
 /*describe('/POST request_type', () => {
    it('it should not POST a request_type without service_time', (done) => {
        let request = {
            tag_name : "new_request_type"
        }
      chai.request(app)
          .post('/api/request_type')
          .send(request)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('service_time');
                res.body.errors.service_time.should.have.property('kind').eql('required');
            done();
          });
    });

});*/