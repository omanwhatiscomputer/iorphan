// 'use strict';

/** 
 * dependencies: mocha, chai, chai-http
 * export module "server.js"
 * use test database
 * define the following script inside "package.json" file
 * "test": "mocha --recursive api_unit_testing.js"
*/

/**
 * # Structure =>
  * describe --------
    *  before --------
    *  describe ------------
    *  describe ------------
    *  describe ------------
    *  after ------------
  * 
 *
 */



 process.env.NODE_ENV = 'test';



 const mongoose = require('mongoose');
 
 //
 
const server = require("../../server");
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { Organization } = require('../../models/organizationModel');
const { before, describe } = require('mocha');


chai.use(chaiHttp);
 
 //parent block
describe("Organization api", () => {
   //request params for getCurrent, update and delete call
   let _id;
 
   before((done) => {
    Organization.deleteMany({}, done);
   });
 
    describe("Create Organization", () => {
       it("should create an organization", (done) => {
 
         let body = {
            "name": "Dummys",
            "location": {
                "latitude": 546554,
                "longitude": 7977487,
            },
            "address": {
                "addressLine1": "dsa asdsaddg sd",
                "addressLine2": "sdfcsdf dsf ds fs", 
                "city": "ddsad ", 
                "state": "esds ", 
                "zipCode": "45534", 
                "country": "ygygf",
            },
            "description": "dsasda asd sad sad sad asd asd adas",
            "logo": "addsd",
            "contacts": {
                "email": "sd.adsa@dsf.com",
                "phoneNumber_1": "5465454",
                "phoneNumber_2": "545564",
                "website": "sdsa.dsa.dsa",
            },
            "bankAccountNo": "6EEF654",
         };
 
         
         
         chai.request(server)
           .post('/api/organizations/')
           .send(body)
           .end((err, res) => {
             res.should.have.status(200);
             _id = res.body._id;
             done();
           });
       });
 
    });
 
     describe("Get All Organizations", () => {
       it("should get all organizations", (done) => {
                 
         chai.request(server)
           .get('/api/organizations/all')
           .end((err, res) => {
             res.should.have.status(200);
             res.body.should.be.a('array');
             done();
           });
       });
 
     });
 
     describe("Get Current Organization", () => {
       it("should get current organization", (done) => {
         let body = {
           '_id': _id
         }
         chai.request(server)
           .get('/api/organizations/')
           .send(body)
           .end((err, res) => {
             res.should.have.status(200);
             done();
           });
       });
 
     });
 
     describe("Update Organization", () => {
       it("should update current organization", (done) => {
 
         let body = {
            "_id": _id,
            "name": "Dummys_new",
            "location": {
                "latitude": 546664,
                "longitude": 7976667,
            },
            "address": {
                "addressLine1": "dsa asdsaddg sd",
                "addressLine2": "sdfcsdf dsf ds fs", 
                "city": "ddsad ", 
                "state": "esds ", 
                "zipCode": "45534", 
                "country": "ygygf",
            },
            "description": "dsasda asd sad sad sad asd asd adas",
            "logo": "addsd",
            "contacts": {
                "email": "sd.adsa@dsf.com",
                "phoneNumber_1": "5465454",
                "phoneNumber_2": "545564",
                "website": "www.dsa.gov.ch",
            },
            "bankAccountNo": "6EEF666",
         };
 
         
         
         chai.request(server)
           .put('/api/organizations/')
           .send(body)
           .end((err, res) => {
             res.should.have.status(200);
             done();
           });
       });
 
     });
 
     describe("Delete Current Organization", () => {
       it("should delete current organization", (done) => {
         let body = {
           '_id': _id
         }
         chai.request(server)
           .delete('/api/organizations/')
           .send(body)
           .end((err, res) => {
             res.should.have.status(200);
             done();
           });
       });
 
     });
 
});
 
   
 /**
  * Add negative cases
  */
 
 