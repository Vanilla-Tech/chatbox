//During the test the env variable is set to test
const bcrypt = require('bcryptjs')

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
let server = require('../../api')
const mongoose = require('mongoose')
const should = chai.should()
const expect = chai.expect
//mongoose.Promise=global.Promise;
chai.use(chaiHttp)
var token

describe('Email', () => {
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

  it('should return 401 Unauthorized', done => {
    const reqBody = {
      customerName: 'Test Name',
      customerEmail: 'bijay@grr.la',
      customerMobileNumber: '213546461231',
      message: 'Test Test',
      departmentCode: 'TEST'
    }

    chai
      .request(server)
      .post('/api/email/offline')
      .send(reqBody)
      // .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json
        res.should.have.status(401)
        done()
      })
  })

  it('should return 200', done => {
    const reqBody = {
      customerName: 'Test Name',
      customerEmail: 'bijay@grr.la',
      customerMobileNumber: '213546461231',
      message: 'Test Test',
      departmentCode: 'TEST'
    }

    chai
      .request(server)
      .post('/api/email/offline')
      .send(reqBody)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json
        res.should.have.status(200)
        done()
      })
  })
  it('should return Invalid Email Id', done => {
    const reqBody = {
      customerName: 'Test Name',
      customerEmail: 'bijaygrr.la',
      customerMobileNumber: '213546461231',
      message: 'Test Test',
      departmentCode: 'TEST'
    }

    chai
      .request(server)
      .post('/api/email/offline')
      .send(reqBody)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json
        res.should.have.status(400)
        done()
      })
  })
  it('should return Invalid Customer Mobile Number', done => {
    const reqBody = {
      customerName: 'Test Name',
      customerEmail: 'bijay@grr.la',
      customerMobileNumber: '21adfaasd35asdfadf46461231',
      message: 'Test Test',
      departmentCode: 'TEST'
    }

    chai
      .request(server)
      .post('/api/email/offline')
      .send(reqBody)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json
        res.should.have.status(400)
        done()
      })
  })
  it('should return Invalid Department Code', done => {
    const reqBody = {
      customerName: 'Test Name',
      customerEmail: 'bijay@grr.la',
      customerMobileNumber: '213546461231',
      message: 'Test Test',
      departmentCode: 'TEdsdsddsST'
    }

    chai
      .request(server)
      .post('/api/email/offline')
      .send(reqBody)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json
        res.should.have.status(400)
        done()
      })
  })
})
