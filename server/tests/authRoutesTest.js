import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/app';
import database from '../database';
import UserController from '../controllers/userController';

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
}, {
  email: 'example@gmail.com',
  password: 'Password1'
}, {
  username: 'mrKingz007',
  password: 'Password1'
}, {
  username: 'mrKingz007',
  email: 'example',
}, {
  username: 'mr',
  email: 'mrkingz@gmail.com',
  password: 'Password1'
}, {
  username: 'mrKingz',
  email: 'mrkingz@gmail.com',
  password: 'Pass'
}, {
  username: '',
  email: 'mrkingz@gmail.com',
  password: 'Pass'
}, {
  username: 'mrKingz',
  email: '',
  password: 'Pass'
}, {
  username: 'mrKingz',
  email: 'mrkingz@gmail.com',
  password: ''
}];

describe('Test authentication routes', () => {
  before((done) => {
    database.getPool().connect((err, client, callback) => {
      client.query('TRUNCATE table users RESTART IDENTITY CASCADE', () => {
        callback();
      });
      UserController.createAdmin();
    });
    done();
  });
  describe('Test sign up route', () => {
    it('It should create a user and return user details', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[0])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(201);
        expect(response.status).to.equal('success');
        expect(response.message).to.equal('Sign up was successful');
        expect(response.data).to.be.an('object');
        expect(response.data).to.have.own.property('userId')
        .to.be.a('number');
        expect(response.data).to.have.own.property('username')
        .to.be.a('string').that.is.equal(users[0].username.toLowerCase());
        expect(response.data).to.have.own.property('email')
        .to.be.a('string').that.is.equal(users[0].email);
        expect(response.data).to.have.own.property('isAdmin')
        .to.be.a('boolean').that.is.equal(false);
        expect(response.data).to.have.property('createdAt');
        done();
      });
    });
    it('It should fail to create user and return username not unique error message', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[0])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(409);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Username has been used');
        done();
      });
    });
    it('It should fail to create user and and return email not unique error message', (done) => {
      server
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
      .send(users[2])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Please, enter a valid email address!');
        done();
      });
    });
    it('It should fail to create user and return required fields error message', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[3])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Username, email and password are required!');
        done();
      });
    });
    it('It should fail to create user and return an error message', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[4])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Username, email and password are required!');
        done();
      });
    });
    it('It should fail to create user and return an error message', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[5])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Username, email and password are required!');
        done();
      });
    });
    it('It should fail to create user and return an error message', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[6])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Username, email and password are required!');
        done();
      });
    });
    it('It should fail to create user and return invalid username error', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[7])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message)
        .to.equal('username, too short! Must be at least 3 characters long!');
        done();
      });
    });
    it('It should fail to create user and return invalid password error', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[8])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message)
        .to.equal('Sorry, password too short! Must be at least 8 characters long!');
        done();
      });
    });
    it('It should fail to create user and return invalid username error', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[9])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message)
        .to.equal('Please, enter your username!');
        done();
      });
    });
    it('It should fail to create user and return invalid password error', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[10])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message)
        .to.equal('Please, enter your email address!');
        done();
      });
    });
    it('It should fail to create user and return invalid password error', (done) => {
      server
      .post('/api/v1/auth/signup')
      .send(users[11])
      .end((err, res) => {
        const response = res.body;
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message)
        .to.equal('Please, enter your password!');
        done();
      });
    });
  });

  describe('Test sign in route', () => {
    before((done) => {
      server
      .post('/api/v1/auth/signup')
      .send({
        username: 'mrKingz001',
        email: 'mrKingz001@gmail.com',
        password: 'Password1'
      })
      .end(() => done());
    });
    it('It should sign in a user with username and password', (done) => {
      server
      .post('/api/v1/auth/signin')
      .send({
        username: 'mrKingz001',
        password: 'Password1'
      })
      .end((err, res) => {
        const response = res.body;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(response.status).to.equal('success');
        expect(response.message).to.equal('Aunthentication was successful');
        expect(response.data).to.be.an('object')
        .to.have.own.property('token').to.be.a('string');
        done();
      });
    });
    it('It should sign in a user with email and password', (done) => {
      server
      .post('/api/v1/auth/signin')
      .send({
        email: 'mrKingz001@gmail.com',
        password: 'Password1'
      })
      .end((err, res) => {
        const response = res.body;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(response.status).to.equal('success');
        expect(response.message).to.equal('Aunthentication was successful');
        expect(response.data).to.be.an('object')
        .to.have.own.property('token').to.be.a('string');
        done();
      });
    });
    it('It should not sign in a user with inavlid username/email and password', (done) => {
      server
      .post('/api/v1/auth/signin')
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
      .post('/api/v1/auth/signin')
      .send()
      .end((err, res) => {
        const response = res.body;
        expect(response).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(response.status).to.equal('fail');
        expect(response.message).to.equal('Username/email and password are required!');
        done();
      });
    });
  });
});
