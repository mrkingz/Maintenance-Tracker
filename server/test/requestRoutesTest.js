import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/app';

const expect = chai.expect;
const server = supertest.agent(app);
let token;
const requests = [{
  subject: 'Faulty Gear box',
  priority: 'Normal',
  department: 'Mechanical',
  description: 'Gear box failing to select reserve',
}, {
  priority: 'Normal',
  department: 'Mechanical',
  description: 'Gear box failing to select reserve',
}, {
  subject: 'Faulty Gear box',
  department: 'Mechanical',
  description: 'Gear box failing to select reserve',
}, {
  subject: 'Faulty Gear box',
  priority: 'Normal',
  description: 'Gear box failing to select reserve',
}, {
  subject: 'Faulty Gear box',
  priority: 'Normal',
  department: 'Mechanical',
}, {
  subject: '',
  priority: 'Normal',
  department: 'Mechanical',
  description: 'Gear box failing to select reserve'
}, {
  subject: 'Faulty Gear Box',
  priority: '',
  department: 'Mechanical',
  description: 'Gear box failing to select reserve'
}, {
  subject: 'Faulty Gear Box',
  priority: 'Normal',
  department: '',
  description: 'Gear box failing to select reserve'
}, {
  subject: 'Faulty Gear Box',
  priority: 'Normal',
  department: 'Mechanical',
  description: ''
}];

describe('Test maintenance request routes', () => {
  before((done) => {
    server
    .post('/api/v1/users/signin')
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
  it('It not create maintenance request for token not provided', (done) => {
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
      expect(response.status).to.equal('fail');
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
      expect(response.status).to.equal('fail');
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
  it('It should not create maintenance request if subject is empty', (done) => {
    server
    .post('/api/v1/users/requests')
    .send({ ...requests[5], token })
    .end((err, res) => {
      const response = res.body;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(response.status).to.equal('fail');
      expect(response.message).to.equal('Please, enter request subject');
      done();
    });
  });
  it('It should not create maintenance request if priority is empty', (done) => {
    server
    .post('/api/v1/users/requests')
    .send({ ...requests[6], token })
    .end((err, res) => {
      const response = res.body;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(response.status).to.equal('fail');
      expect(response.message).to.equal('Please, enter request priority');
      done();
    });
  });
  it('It should not create maintenance request if department is empty', (done) => {
    server
    .post('/api/v1/users/requests')
    .send({ ...requests[7], token })
    .end((err, res) => {
      const response = res.body;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(response.status).to.equal('fail');
      expect(response.message).to.equal('Please, select department');
      done();
    });
  });  
  it('It should not create maintenance request if description is empty', (done) => {
    server
    .post('/api/v1/users/requests')
    .send({ ...requests[8], token })
    .end((err, res) => {
      const response = res.body;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(response.status).to.equal('fail');
      expect(response.message).to.equal('Please, enter brief request description');
      done();
    });
  });
  it('It create maintenance request', (done) => {
    server
    .post('/api/v1/users/requests')
    .send({ ...requests[0], token })
    .end((err, res) => {
      const response = res.body;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(201);
      expect(response.status).to.equal('success');
      expect(response.message).to.equal('Maintenance request successfully created');
      expect(response.data).to.be.an('object');
      expect(response.data).to.have.own.property('requestId')
      .to.be.a('number').that.is.equal(1);
      expect(response.data).to.have.own.property('userId')
      .to.be.a('number').that.is.equal(1);
      expect(response.data).to.have.own.property('subject')
      .to.be.a('string').that.is.equal(requests[0].subject);
      expect(response.data).to.have.own.property('priority')
      .to.be.a('string').that.is.equal(requests[0].priority);
      expect(response.data).to.have.own.property('status')
      .to.be.a('string').that.is.equal('Pending');
      expect(response.data).to.have.own.property('description')
      .to.be.a('string').that.is.equal(requests[0].description);
      expect(response.data).to.have.own.property('department')
      .to.be.a('string').that.is.equal(requests[0].department);
      expect(response.data).to.have.property('createdAt');
      expect(response.data).to.have.property('updatedAt');
      done();
    });
  });
  it('It should get a single maintenance request of a user', (done) => {
    server
    .get('/api/v1/users/requests/1')
    .send({ token })
    .end((err, res) => {
      const response = res.body;
      const request = response.data.request;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(200);
      expect(response.status).to.equal('success');
      expect(response.data).to.be.an('object');
      expect(request).to.have.own.property('requestId')
      .to.be.a('number').that.is.equal(1);
      expect(request).to.have.own.property('userId')
      .to.be.a('number').that.is.equal(1);
      expect(request).to.have.own.property('subject')
      .to.be.a('string').that.is.equal(requests[0].subject);
      expect(request).to.have.own.property('priority')
      .to.be.a('string').that.is.equal(requests[0].priority);
      expect(request).to.have.own.property('status')
      .to.be.a('string').that.is.equal('Pending');
      expect(request).to.have.own.property('description')
      .to.be.a('string').that.is.equal(requests[0].description);
      expect(request).to.have.own.property('department')
      .to.be.a('string').that.is.equal(requests[0].department);
      expect(request).to.have.property('createdAt');
      expect(request).to.have.property('updatedAt');
      done();
    });
  });
  it('It should get all maintenance request of a user', (done) => {
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
      expect(requestsArray[0]).to.have.own.property('requestId')
      .to.be.a('number').that.is.equal(1);
      expect(requestsArray[0]).to.have.own.property('userId')
      .to.be.a('number').that.is.equal(1);
      expect(requestsArray[0]).to.have.own.property('subject')
      .to.be.a('string').that.is.equal(requests[0].subject);
      expect(requestsArray[0]).to.have.own.property('priority')
      .to.be.a('string').that.is.equal(requests[0].priority);
      expect(requestsArray[0]).to.have.own.property('status')
      .to.be.a('string').that.is.equal('Pending');
      expect(requestsArray[0]).to.have.own.property('description')
      .to.be.a('string').that.is.equal(requests[0].description);
      expect(requestsArray[0]).to.have.own.property('department')
      .to.be.a('string').that.is.equal(requests[0].department);
      expect(requestsArray[0]).to.have.property('createdAt');
      expect(requestsArray[0]).to.have.property('updatedAt');
      done();
    });
  });
  it('It should update a maintenance request', (done) => {
    server
    .put('/api/v1/users/requests/1')
    .send({ priority: 'Urgent', token })
    .end((err, res) => {
      const response = res.body;
      const request = response.data.request;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(202);
      expect(response.status).to.equal('success');
      expect(response.message).to.equal('Request successfully updated');
      expect(response.data).to.be.an('object');
      expect(request).to.have.own.property('requestId')
      .to.be.a('number').that.is.equal(1);
      expect(request).to.have.own.property('userId')
      .to.be.a('number').that.is.equal(1);
      expect(request).to.have.own.property('subject')
      .to.be.a('string').that.is.equal(requests[0].subject);
      expect(request).to.have.own.property('priority')
      .to.be.a('string').that.is.equal('Urgent');
      expect(request).to.have.own.property('status')
      .to.be.a('string').that.is.equal('Pending');
      expect(request).to.have.own.property('description')
      .to.be.a('string').that.is.equal(requests[0].description);
      expect(request).to.have.own.property('department')
      .to.be.a('string').that.is.equal(requests[0].department);
      expect(request).to.have.property('createdAt');
      expect(request).to.have.property('updatedAt');
      done();
    });
  });
  it('It should delete a maintenance request if found', (done) => {
    server
    .delete('/api/v1/users/requests/1')
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
  it('It should not create maintenance request if subject is not provided', (done) => {
    server
    .post('/api/v1/users/requests')
    .send({ ...requests[1], token })
    .end((err, res) => {
      const response = res.body;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(response.status).to.equal('fail');
      expect(response.message).to.equal('Request subject is required');
      done();
    });
  });
  it('It should not create maintenance request if priority is not provided', (done) => {
    server
    .post('/api/v1/users/requests')
    .send({ ...requests[2], token })
    .end((err, res) => {
      const response = res.body;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(response.status).to.equal('fail');
      expect(response.message).to.equal('Request priority is required');
      done();
    });
  });
  it('It should not create maintenance request if department is not provided', (done) => {
    server
    .post('/api/v1/users/requests')
    .send({ ...requests[3], token })
    .end((err, res) => {
      const response = res.body;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(response.status).to.equal('fail');
      expect(response.message).to.equal('Department is required');
      done();
    });
  });
  it('It should not create maintenance request if description is not provided', (done) => {
    server
    .post('/api/v1/users/requests')
    .send({ ...requests[4], token })
    .end((err, res) => {
      const response = res.body;
      expect(response).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(response.status).to.equal('fail');
      expect(response.message).to.equal('Brief description is required');
      done();
    });
  });
});
