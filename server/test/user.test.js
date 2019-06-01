import request from 'supertest';
import { expect } from 'chai';
import utils from '../helpers/commons';
import app from '../index';
import users from '../models/User';

describe('User Controller', () => {
  describe('test POST /api/v1/auth/signup', () => {
    after((done) => {
      app.close();
      done();
    });
    it('should NOT register a new user when First Name is missing', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 45,
          email: 'absin@aol.com',
          lastName: 'Alabre',
          password: 'computer1',
          confirmPassword: 'computer1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT register a new user when Last Name is missing', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 45,
          email: 'absin@aol.com',
          firstName: 'Alabre',
          password: 'computer1',
          confirmPassword: 'computer1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT register a new user when Email is missing', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 45,
          firstName: 'absin',
          lastName: 'Alabre',
          password: 'computer1',
          confirmPassword: 'computer1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT register a new user when Password is missing', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 45,
          email: 'absin@aol.com',
          firstName: 'Alabre',
          lastName: 'Arowolo',
          confirmPassword: 'computer1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT register a new user when Confirm Password is missing', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 45,
          email: 'absin@aol.com',
          firstName: 'Alabre',
          lastName: 'Rebecca',
          password: 'computer1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT register a new user when Password does not equal Confirm Password missing', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 45,
          email: 'absin@aol.com',
          firstName: 'Alabre',
          lastName: 'Remi',
          password: 'computer1',
          confirmPassword: 'computer11',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT register a new user if Email exists', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 45,
          email: 'abtosin@aol.com',
          firstName: 'Alabre',
          lastName: 'Kehinde',
          password: 'computer1',
          confirmPassword: 'computer1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should register a new user if all parameters are supplied', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 45,
          email: 'ferg@yahoo.com',
          firstName: 'Alabre',
          lastName: 'Kehinde',
          password: '123456',
          confirmPassword: '123456',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
  });

  /**
   * test POST /api/v1/auth/signin
   */

  describe('test POST /api/v1/auth/signin', () => {
    after((done) => {
      app.close();
      done();
    });
    it('should NOT sign in a user when Email is missing', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signin')
        .send({
          password: 'computer1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT sign in a user when Password is missing', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'absin@aol.com',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT sign in a user if Email does NOT exists', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'abtosinlll@aol.com',
          password: 'computer1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT sign in a new user if password is incorrect', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'abtosin@aol.com',
          password: 'computer1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.a('object');
          }
          done();
        });
    });
    it('should NOT sign in a new user if email format is incorrect', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'abtosinaol.com',
          password: 'computer111',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('Email must be valid');
          }
          done();
        });
    });
  });
});
