import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/app';
import db from '../database';
import UtilityService from '../services/utilityService';

const expect = chai.expect;
const server = supertest.agent(app);

describe('Miscellaneous test', () => {
  it('It should return connection ok', (done) => {
    server
    .get('/api')
    .end((err, res) => {
      const { status, message } = res.body;
      expect(res.body).to.be.an('object');
      expect(res.statusCode).to.equal(200);
      expect(status).to.be.a('string')
      .that.is.equal('success');
      expect(message).to.be.a('string')
      .that.is.equal('Connection ok');
      done();
    });
  }); 
  it('It should return error message for unsupported route', (done) => {
    server
    .get('/*')
    .end((err, res) => {
      const { status, message } = res.body;
      expect(res.body).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(status).to.be.a('string')
      .that.is.equal('fail');
      expect(message).to.be.a('string')
      .that.is.equal('Sorry, there is nothing here!');
      done();
    });
  });
});
describe('Test class Database', () => {
  it('Test database instance', () => {
    const options = db.pool.options;
    const { 
      user, database, password, port, host
    } = options;
    expect(db).to.be.an('object');
    expect(options).to.have.own.property('user').to.be.a('string')
    .that.is.equal(user);
    expect(options).to.have.own.property('database').to.be.a('string')
    .that.is.equal(database);
    expect(options).to.have.own.property('password').to.be.a('string')
    .that.is.equal(password);
    expect(options).to.have.own.property('port').to.be.a('string')
    .that.is.equal(port);
    expect(options).to.have.own.property('host').to.be.a('string')
    .that.is.equal(host);
  });
  it('Test db.getPoot()', () => {
    const options = db.getPool().options;
    const { 
      user, database, password, port, host
    } = options;
    expect(db).to.be.an('object');
    expect(options).to.have.own.property('user').to.be.a('string')
    .that.is.equal(user);
    expect(options).to.have.own.property('database').to.be.a('string')
    .that.is.equal(database);
    expect(options).to.have.own.property('password').to.be.a('string')
    .that.is.equal(password);
    expect(options).to.have.own.property('port').to.be.a('string')
    .that.is.equal(port);
    expect(options).to.have.own.property('host').to.be.a('string')
    .that.is.equal(host);
  });
  it('Test db.getConnectionError()', () => {
    const error = db.getConnectionError();
    expect(error).to.be.an('string');
    expect(error).to.be.equal('Database connection fail');
  });
  it('Test db.getQueryError()', () => {
    const error = db.getQueryError();
    expect(error).to.be.an('string');
    expect(error).to.be.equal('Sorry, an error occured');
  });
});
describe('Test class UtilityService', () => {
	describe('Test method trimWhiteSpace of UtilityService', () => {
		it('UtilityService.trimWhiteSpace(\' Normal\') should equal', () => {
			expect(UtilityService.trimWhiteSpace(' Normal')).to.equal('Normal');
		});
		it('UtilityService.trimWhiteSpace(\' Gear    Box\', false) should equal', () => {
			expect(UtilityService.trimWhiteSpace('Gear    Box', false))
			.to.equal('Gear Box');
		});
		it('UtilityService.trimWhiteSpace(\' Mechanical \', true) should equal', () => {
			expect(UtilityService.trimWhiteSpace(' Mechanical ', true))
			.to.equal('Mechanical');
		});
	});
	describe('Test method upperCaseFirst of UtilityService', () => {
		const department = UtilityService.upperCaseFirst('mechanical');
		it('should capitalize the first character', () => {
			expect(department).to.be.a('string')
			.that.is.equal('Mechanical');
		});
		const upperCase = UtilityService.upperCaseFirst({
      subject: 'faulty gear box'
    }, { bool: true });
		it('should capitalize the first character of every word', () => {
			expect(upperCase).to.be.an('object');
			expect(upperCase).to.have.own.property('subject').to.be.a('string')
			.that.is.equal('Faulty Gear Box');
    });
    const topic = UtilityService.upperCaseFirst('broken windshield');
		it('should capitalize the first character in the string argument', () => {
			expect(topic).to.be.a('string');
			expect(topic).to.be.equal('Broken windshield');
		});
		const name = UtilityService.upperCaseFirst('broken wiper', { bool: true });
		it('should capitalize the first character of every word in the string argument', () => {
			expect(name).to.be.a('string');
			expect(name).to.be.equal('Broken Wiper');
		});
		const recipe = UtilityService.upperCaseFirst({
      title: 'broken windshield and faulty wiper' 
    }, { bool: true, skip: ['and'] });
		it(`should capitalize the first character of every word'
			excluding the string in the array`, () => {
			expect(recipe).to.be.an('object');
			expect(recipe).to.have.own.property('title').to.be.a('string')
			.that.is.equal('Broken Windshield and Faulty Wiper');
		});
	});
});