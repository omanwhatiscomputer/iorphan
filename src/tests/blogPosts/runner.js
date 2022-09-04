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
const { BlogPost } = require('../../models/blogPostModel');
const { before, describe, it } = require('mocha');




chai.use(chaiHttp);

//parent block
describe("Blog Posts api", () => {

  //request params for getCurrent, update and delete call
  let _id;

  before((done) => {
    BlogPost.deleteMany({}, done);
  });

  describe("Create Post", () => {
      it("should create a new post", (done) => {

        let body = {
            'title': 'dummy-test',
            'author': new mongoose.Types.ObjectId(),
            'body': 'Lorem ipsum dior',
            'subHeading': 'sfsfsdsd fsdfds fds',
            'photo' : new mongoose.Types.ObjectId(),
        };

        
        
        chai.request(server)
          .post('/api/blogPosts/')
          .send(body)
          .end((err, res) => {
            res.should.have.status(200);
            _id = res.body._id;
            done();
          });
      });

    });

    describe("Get All Posts", () => {
      it("should get all posts", (done) => {
                
        chai.request(server)
          .get('/api/blogPosts/all')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
      });

    });

    describe("Get Current Post", () => {
      it("should get current post", (done) => {
        let body = {
          '_id': _id
        }
        chai.request(server)
          .get('/api/blogPosts/')
          .send(body)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

    });

    describe("Update Post", () => {
      it("should update current post", (done) => {

        let body = {
            '_id': _id,
            'title': 'new dummy-test',
            'body': 'new Lorem ipsum dior',
            'subHeading': 'updated text',
            'photo' : new mongoose.Types.ObjectId(),
        };

        
        
        chai.request(server)
          .put('/api/blogPosts/')
          .send(body)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

    });

    describe("Delete Current Post", () => {
      it("should delete current post", (done) => {
        let body = {
          '_id': _id
        }
        chai.request(server)
          .delete('/api/blogPosts/')
          .send(body)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

    });

    describe("Get Current Post with invalid ID", () => {
      it("should get a 404 not found error", (done) => {
        let body = {
          '_id': _id
        }
        chai.request(server)
          .get('/api/blogPosts/')
          .send(body)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });

    });

    describe("Create Post with invalid input", () => {
      it("should get a 400 bad request error", (done) => {

        let body = {
          'title': 'dummy-test',
          'author': new mongoose.Types.ObjectId(),
          'subHeading': 'sfsfsdsd fsdfds fds',
          'photo' : new mongoose.Types.ObjectId(),
        };

        
        
        chai.request(server)
          .post('/api/blogPosts/')
          .send(body)
          .end((err, res) => {
            res.should.have.status(400);
            _id = res.body._id;
            done();
          });
      });

    });

  });

  

 /**
  * Add negative cases
  */
