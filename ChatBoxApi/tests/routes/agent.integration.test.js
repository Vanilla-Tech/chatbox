//During the test the env variable is set to test
// const bcrypt = require("bcryptjs");

var importValue = require('./migration.integration.test')
//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
let server = require('../../api')
// const mongoose = require("mongoose");
// const should = chai.should();
const expect = chai.expect
//mongoose.Promise=global.Promise;
chai.use(chaiHttp)
var token, userid

describe('Agents', () => {
  it('should login user', done => {
    const user = {
      staffId: 'my0001',
      password: 'Password',
      sourcePortal: 'AGENT'
    }
    chai
      .request(server)
      .post('/api/login')
      .send(user)
      .end((err, res) => {
        expect(res).to.be.json
        token = res.body.token
        userid = res.body.id
        resetpasswordUserId = res.body.id
        res.should.have.status(200)
        done()
      })
  })

  describe('/api/agents/findbyemail', () => {
    it('should return 401 Unauthorized', done => {
      const reqBody = {
        email: 'testblock@test.com'
      }

      chai
        .request(server)
        .post('/api/agents/findbyemail')
        // .set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('should return 200', done => {
      const reqBody = {
        email: 'testblock@test.com'
      }

      chai
        .request(server)
        .post('/api/agents/findbyemail')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('No agents found', done => {
      const reqBody = {
        email: 'testb123ck@test.com'
      }

      chai
        .request(server)
        .post('/api/agents/findbyemail')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('email must be a string', done => {
      const reqBody = {
        email: null
      }

      chai
        .request(server)
        .post('/api/agents/findbyemail')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })

    it('email must be a valid email', done => {
      const reqBody = {
        email: '8Square'
      }

      chai
        .request(server)
        .post('/api/agents/findbyemail')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
    it('email is not allowed to be empty', done => {
      const reqBody = {
        email: ''
      }

      chai
        .request(server)
        .post('/api/agents/findbyemail')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
    it('No departments available', done => {
      const reqBody = {
        email: 'testunapproved@test.com'
      }

      chai
        .request(server)
        .post('/api/agents/findbyemail')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
  describe('/api/agents/findbyid', () => {
    it('should return 401 Unauthorized', done => {
      const reqBody = {
        agentId: userid
      }

      chai
        .request(server)
        .post('/api/agents/findbyid')
        // .set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('should return 200', done => {
      const reqBody = {
        agentId: userid
      }

      chai
        .request(server)
        .post('/api/agents/findbyid')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('No agents found', done => {
      const reqBody = {
        agentId: importValue.department_Id
      }

      chai
        .request(server)
        .post('/api/agents/findbyid')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('agentId must be a string', done => {
      const reqBody = {
        agentId: null
      }

      chai
        .request(server)
        .post('/api/agents/findbyid')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })

    it('agentId is not allowed to be empty', done => {
      const reqBody = {
        agentId: ''
      }

      chai
        .request(server)
        .post('/api/agents/findbyid')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })

    it('No departments available', done => {
      const reqBody = {
        agentId: importValue.userWithouDepartment
      }

      chai
        .request(server)
        .post('/api/agents/findbyid')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
})
