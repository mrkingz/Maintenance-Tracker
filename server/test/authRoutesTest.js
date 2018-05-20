import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/app';

const expect = chai.expect;
const server = supertest.agent(app);

const users = [{
  username: 'mrKingz',
  email: 'example@gmail.com',
  password: 'Password1'
}, {
  username: 'mrKingz_ng',
  email: 'example@gmail.com',
  password: 'Password1'
}, {
  username: 'mrKingz007',
  email: 'example',
  password: 'Password1'
}, {
  username: 'mrKingz007',
  email: 'example@gmail.com',
}];

describe('Test authentication routes', () => {
  describe('Test sign up route', () => {
    it('It should create a user and return user details', (done) => {
      server
      .post('/api/v1/users/signup')
      .send(users[0])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(201);
        expect(response.status).to.equal('success');
        expect(response.message).to.equal('Sign up was successful');
        expect(response.data).to.be.an('object');
        expect(response.data).to.have.own.property('userId')
        .to.be.a('number').that.is.equal(1);
        expect(response.data).to.have.own.property('username')
        .to.be.a('string').that.is.equal(users[0].username);
        expect(response.data).to.have.own.property('email')
        .to.be.a('string').that.is.equal(users[0].email);
        expect(response.data).to.have.own.property('isAdmin')
        .to.be.a('boolean').that.is.equal(false);
        expect(response.data).to.have.property('createdAt');
        done();
      });
    });
    it('It should fail to create user and and return unique username validation error message', (done) => {
      server
      .post('/api/v1/users/signup')
      .send(users[0])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(409);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Username has been used');
        done();
      });
    });
    it('It should fail to create user and and return unique email validation error message', (done) => {
      server
      .post('/api/v1/users/signup')
      .send(users[1])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(409);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Email has been used');
        done();
      });
    });
    it('It should fail to create user and return invalid entry error message', (done) => {
      server
      .post('/api/v1/users/signup')
      .send(users[2])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Please, enter a valid email address');
        done();
      });
    });
    it('It should fail to create user and return required fields error message', (done) => {
      server
      .post('/api/v1/users/signup')
      .send(users[3])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Username, email and password are required');
        done();
      });
    });
  });
  describe('Test sign in route', () => {
    before((done) => {
      server
      .post('/api/v1/users/signup')
      .send({
        username: 'mrKingz001',
        email: 'mrKingz001@gmail.com',
        password: 'Password1'
      })
      .end(() => done());
    });
    it('It should sign in a user with username and password', (done) => {
      server
      .post('/api/v1/users/signin')
      .send({
        username: 'mrKingz001',
        password: 'Password1'
      })
      .end((err, res) => {
        const response = res.body;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(response.status).to.equal('success');
        expect(response.message).to.equal('Successfully signed in');
        expect(response.data).to.be.an('object')
        .to.have.own.property('token').to.be.a('string');
        done();
      });
    });
    it('It should sign in a user with email and password', (done) => {
      server
      .post('/api/v1/users/signin')
      .send({
        email: 'mrKingz001@gmail.com',
        password: 'Password1'
      })
      .end((err, res) => {
        const response = res.body;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(response.status).to.equal('success');
        expect(response.message).to.equal('Successfully signed in');
        expect(response.data).to.be.an('object')
        .to.have.own.property('token').to.be.a('string');
        done();
      });
    });
    it('It should not sign in a user with inavlid username/email and password', (done) => {
      server
      .post('/api/v1/users/signin')
      .send({
        email: 'mrKingz001@hotmail.com',
        password: 'Password1'
      })
      .end((err, res) => {
        const response = res.body;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(401);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Invalid sign in credentials');
        done();
      });
    });
    it('It should not sign in a user with inavlid email', (done) => {
      server
      .post('/api/v1/users/signin')
      .send()
      .end((err, res) => {
        const response = res.body;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(401);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Username/email and password not provided');
        done();
      });
    });
  });
});
