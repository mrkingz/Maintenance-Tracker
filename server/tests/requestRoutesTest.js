import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/app';

const expect = chai.expect;
const server = supertest.agent(app);
let token, requestId;
const requests = [{
  subject: 'Faulty Gear Box',
  priority: 'Normal',
  type: 'Maintenance',
  description: 'Gear box failing to select reserve',
}, {
  priority: 'Normal',
  type: 'Maintenance',
  description: 'Gear box failing to select reserve',
}, {
  subject: 'Faulty Gear Box',
  type: 'Maintenance',
  description: 'Gear box failing to select reserve',
}, {
  subject: 'Faulty Gear Box',
  priority: 'Normal',
  description: 'Gear box failing to select reserve',
}, {
  subject: 'Faulty Gear Box',
  priority: 'Normal',
  type: 'Maintenance',
}, {
  subject: '',
  priority: 'Normal',
  type: 'Maintenance',
  description: 'Gear box failing to select reserve'
}, {
  subject: 'Faulty Gear Box',
  priority: '',
  type: 'Maintenance',
  description: 'Gear box failing to select reserve'
}, {
  subject: 'Faulty Gear Box',
  priority: 'Normal',
  type: '',
  description: 'Gear box failing to select reserve'
}, {
  subject: 'Faulty Gear Box',
  priority: 'Normal',
  type: 'Maintenance',
  description: ''
}, {
  subject: '[]',
  priority: 'Normal',
  type: 'Maintenance',
  description: 'Gear box failing to select reserve'
}, {
  subject: 'Faulty Gear Box',
  priority: '12345',
  type: 'Maintenance',
  description: 'Gear box failing to select reserve'
}, {
  subject: 'Faulty Gear Box',
  priority: 'Urgent',
  type: 'Maintenance123',
  description: 'Gear box failing to select reserve'
}];
describe('Test request routes', () => {
  before((done) => {
    server
      .post('/api/v1/auth/signin')
      .send({
        email: 'example@gmail.com',
        password: 'Password1'
      })
      .end((err, res) => {
        const response = res.body;
        token = response.data.token;
        done();
      });
  });
  describe('Test request routes with invalid data', () => {
    it('It not create request for token not provided', (done) => {
      server
        .post('/api/v1/users/requests')
        .send(requests[0])
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(401);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Access denied! Token not provided');
          done();
        });
    });
    it('It should return request not found', (done) => {
      server
        .get('/api/v1/users/requests/1')
        .send({ token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(404);
          expect(response.status).to.equal('success');
          expect(response.message).to.be.equal('Request not found');
          done();
        });
    });
    it('It should return requests not found', (done) => {
      server
        .get('/api/v1/users/requests')
        .send({ token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(404);
          expect(response.status).to.equal('success');
          expect(response.message).to.be.equal('Requests not found');
          done();
        });
    });
    it('It should not create maintenance request for invalid token', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[0], token: 'token' })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(401);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Access denied! Invalid authentication token');
          done();
        });
    });

    it('It should not create maintenance request if subject is not provided', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[1], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Please, enter request subject!');
          done();
        });
    });
    it('It should not create request if priority is not provided', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[2], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Please, enter request priority!');
          done();
        });
    });
    it('It should not create request if request type is not provided', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[3], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Request type cannot be empty!');
          done();
        });
    });
    it('It should not create request if description is not provided', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[4], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Please, enter brief request description!');
          done();
        });
    });
    it('It should not create request if subject is empty', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[5], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Please, enter request subject!');
          done();
        });
    });
    it('It should not create request if priority is empty', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[6], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Please, enter request priority!');
          done();
        });
    });
    it('It should not create request if department is empty', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[7], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Request type cannot be empty!');
          done();
        });
    });
    it('It should not create request if description is empty', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[8], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Please, enter brief request description!');
          done();
        });
    });
    it('It should not create request if invalid priority', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[9], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Invalid entry for subject!');
          done();
        });
    });
    it('It should not create request for invalid priority', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[10], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Invalid entry for request priority!');
          done();
        });
    });
    it('It should not create request for invalid department name', (done) => {
      server
        .post('/api/v1/users/requests')
        .send({ ...requests[11], token })
        .end((err, res) => {
          const response = res.body;
          expect(response).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(response.status).to.equal('fail');
          expect(response.message).to.equal('Invalid entry for request type!');
          done();
        });
    });
  });
  describe('Test request routes with valid data', () => {
    it('It should create request', (done) => {
      server
      .post('/api/v1/users/requests')
      .send({ ...requests[0], token })
      .end((err, res) => {
        const response = res.body;
        requestId = response.data.requestid;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(201);
        expect(response.status).to.equal('success');
        expect(response.message).to.equal('Request successfully created');
        expect(response.data).to.be.an('object');
        expect(response.data).to.have.own.property('requestid')
        .to.be.a('number');
        expect(response.data).to.have.own.property('userid')
        .to.be.a('number');
        expect(response.data).to.have.own.property('subject')
        .to.be.a('string').that.is.equal(requests[0].subject);
        expect(response.data).to.have.own.property('priority')
        .to.be.a('string').that.is.equal(requests[0].priority);
        expect(response.data).to.have.own.property('status')
        .to.be.a('string').that.is.equal('Pending');
        expect(response.data).to.have.own.property('description')
        .to.be.a('string').that.is.equal(requests[0].description);
        expect(response.data).to.have.own.property('type')
        .to.be.a('string').that.is.equal(requests[0].type);
        expect(response.data).to.have.property('createdat');
        done();
      });
    });
    it('It should get a single request of a user', (done) => {
      server
      .get(`/api/v1/users/requests/${requestId}`)
      .send({ token })
      .end((err, res) => {
        const response = res.body;
        const request = response.data.request;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(response.status).to.equal('success');
        expect(response.data).to.be.an('object');
        expect(request).to.have.own.property('requestid')
        .to.be.a('number');
        expect(request).to.have.own.property('userid')
        .to.be.a('number');
        expect(request).to.have.own.property('subject')
        .to.be.a('string').that.is.equal(requests[0].subject);
        expect(request).to.have.own.property('priority')
        .to.be.a('string').that.is.equal(requests[0].priority);
        expect(request).to.have.own.property('status')
        .to.be.a('string').that.is.equal('Pending');
        expect(request).to.have.own.property('description')
        .to.be.a('string').that.is.equal(requests[0].description);
        expect(request).to.have.own.property('type')
        .to.be.a('string').that.is.equal(requests[0].type);
        expect(request).to.have.property('createdat');
        expect(request).to.have.property('updatedat');
        done();
      });
    });
    it('It should get all request of a user', (done) => {
      server
      .get('/api/v1/users/requests')
      .send({ token })
      .end((err, res) => {
        const response = res.body;
        const requestsArray = response.data.requests;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(response.status).to.equal('success');
        expect(response.data).to.be.an('object');
        expect(requestsArray).to.be.an('array');
        expect(requestsArray[0]).to.have.own.property('requestid')
        .to.be.a('number');
        expect(requestsArray[0]).to.have.own.property('userid')
        .to.be.a('number');
        expect(requestsArray[0]).to.have.own.property('subject')
        .to.be.a('string').that.is.equal(requests[0].subject);
        expect(requestsArray[0]).to.have.own.property('priority')
        .to.be.a('string').that.is.equal(requests[0].priority);
        expect(requestsArray[0]).to.have.own.property('status')
        .to.be.a('string').that.is.equal('Pending');
        expect(requestsArray[0]).to.have.own.property('description')
        .to.be.a('string').that.is.equal(requests[0].description);
        expect(requestsArray[0]).to.have.own.property('type')
        .to.be.a('string').that.is.equal(requests[0].type);
        expect(requestsArray[0]).to.have.property('createdat');
        expect(requestsArray[0]).to.have.property('updatedat');
        done();
      });
    });
    it('It should update a request', (done) => {
      server
      .put(`/api/v1/users/requests/${requestId}`)
      .send({ priority: 'Urgent', token })
      .end((err, res) => {
        const response = res.body;
        const request = response.data.request;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(202);
        expect(response.status).to.equal('success');
        expect(response.message).to.equal('Request successfully updated');
        expect(response.data).to.be.an('object');
        expect(request).to.have.own.property('requestid')
        .to.be.a('number');
        expect(request).to.have.own.property('userid')
        .to.be.a('number');
        expect(request).to.have.own.property('subject')
        .to.be.a('string').that.is.equal(requests[0].subject);
        expect(request).to.have.own.property('priority')
        .to.be.a('string').that.is.equal('Urgent');
        expect(request).to.have.own.property('status')
        .to.be.a('string').that.is.equal('Pending');
        expect(request).to.have.own.property('description')
        .to.be.a('string').that.is.equal(requests[0].description);
        expect(request).to.have.own.property('type')
        .to.be.a('string').that.is.equal(requests[0].type);
        expect(request).to.have.property('createdat');
        expect(request).to.have.property('updatedat');
        done();
      });
    });
    it('It should delete a request if found', (done) => {
      server
      .delete(`/api/v1/users/requests/${requestId}`)
      .send({ token })
      .end((err, res) => {
        const response = res.body;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(response.status).to.equal('success');
        expect(response.message).to.equal('Request successfully deleted');
        done();
      });
    });
  });
});
