//During the test the env variable is set to test
const bcrypt = require('bcryptjs')

var importValue = require('./migration.integration.test')
//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
let server = require('../../api')
const mongoose = require('mongoose')
const should = chai.should()
const expect = chai.expect
//mongoose.Promise=global.Promise;
chai.use(chaiHttp)
var token, userid
//departmentId=importValue.department_Id;

describe('Customer', () => {
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

  describe('/api/customer/save', () => {
    it('should return 401 Unauthorized', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/save')
        //  .set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('should return 200', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/save')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
    it('Email is already taken', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/save')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('email must be a valid email', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay8square',
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/save')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
    it('email must be a string', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: null,
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/save')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
  })

  describe('/api/customer/addupdate', () => {
    it('should return 401 Unauthorized', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/addupdate')
        //.set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })

    it('should return 200', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/addupdate')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
    it('Should Update User', done => {
      const reqBody = {
        name: 'Ram Parsad',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/addupdate')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('Should return 200', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijayzx@8square.com',
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/addupdate')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('email must be a valid email', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay8square',
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/addupdate')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
    it('email must be a string', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: null,
        mobileNumber: '9841180900'
      }

      chai
        .request(server)
        .post('/api/customer/addupdate')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
  })
  describe('/api/customer/departmentsave', () => {
    it('should return 401 Unauthorized', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900',
        departmentCode: importValue.department_Code
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        //.set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })

    it('should return 200', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900',
        departmentCode: importValue.department_Code
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('departmentCode must be a string(422)', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900',
        departmentCode: null
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
    it('departmentCode is not allowed to be empty(422)', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900',
        departmentCode: ''
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
    it('Department not available(400)', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: '9841180900',
        departmentCode: 'cccc'
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
    it('mobileNumber must be a string(422)', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: null,
        departmentCode: importValue.department_Code
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
    it('mobileNumber is not valid! (422)', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'bijay@8square.com',
        mobileNumber: 'ADVCKJDSKJD#%',
        departmentCode: importValue.department_Code
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
    it('email must be a string(422)', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: null,
        mobileNumber: '98427890323',
        departmentCode: importValue.department_Code
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
    it('Email is required (400)', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: '',
        mobileNumber: 'ADVCKJDSKJD#%',
        departmentCode: importValue.department_Code
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
    it('email must be a valid email(422)', done => {
      const reqBody = {
        name: 'Bijay Bhandari',
        email: 'dsdsdsd',
        mobileNumber: '98427890323',
        departmentCode: importValue.department_Code
      }

      chai
        .request(server)
        .post('/api/customer/departmentsave')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
  })
})
