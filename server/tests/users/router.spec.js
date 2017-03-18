/* eslint global-require: 0, import/no-extraneous-dependencies: 0 */
const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const mockery = require('mockery-next');
const Promise = require('bluebird');
const request = require('supertest-as-promised');
const sinon = require('sinon');

require('should');
require('co-mocha');

Promise.onPossiblyUnhandledRejection(() => {});
mockery.resetCache();

const usersSrvc = {
  createUser: sinon.stub(),
};

function getMockServer() {
  mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false,
    useCleanCache: true,
  });

  mockery.registerMock('../../src/users/usersSrvc', usersSrvc);

  const app = express();
  app.use(require('../../src/users/router'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  return app;
}

function resetStubs() {
  _.each([usersSrvc], api => _.each(api, stub => stub.reset()));
}

const mockReqBody = {
  firstName: 'test',
  lastName: 'test',
  address: 'test',
  company: 'test',
};

describe('[Users Router] POST /users', () => {
  let app;

  before(() => {
    app = getMockServer();
  });
  after(mockery.deregisterAll);
  beforeEach(resetStubs);

  it('Returns json on success', () => {
    usersSrvc.createUser.returns(Promise.resolve({ id: '123', userProfile: mockReqBody }));
    return request(app).post('/')
    .send(mockReqBody)
    .then(res => {
      res.statusCode.should.equal(201);
    });
  });

  it('Returns error on failure', () => {
    usersSrvc.createUser.returns(Promise.reject({ statusCode: 500, message: 'err' }));
    return request(app).post('/')
    .send(mockReqBody)
    .then(res => {
      res.statusCode.should.equal(500);
    });
  });
});
