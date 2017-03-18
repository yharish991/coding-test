/* eslint global-require: 0, import/no-extraneous-dependencies: 0 */
const mockery = require('mockery-next');
const Promise = require('bluebird');
const sinon = require('sinon');

require('should');
require('co-mocha');

Promise.onPossiblyUnhandledRejection(() => {});
mockery.resetCache();
const requestMock = sinon.stub();

const modelMock = {
  createOrUpdateDocument: sinon.stub(),
  Databases: {
    USERS: 'users',
  },
};

let usersSrvc;

const userMockData = {
  firstName: 'test',
  lastName: 'test',
  address: 'test',
  company: 'test',
};

function registerMock() {
  mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false,
    useCleanCache: true,
  });

  mockery.registerMock('../../src/models/model', modelMock);
  mockery.registerMock('request-promise', requestMock);
  usersSrvc = require('../../src/users/usersSrvc');
}

function resetStubs() {
  requestMock.reset();
}

describe('[Users Service]  create user', () => {
  before(registerMock);
  after(mockery.deregisterAll);
  afterEach(resetStubs);

  it('will create user', function* createUser() {
    modelMock.createOrUpdateDocument.returns(Promise.resolve(userMockData));
    let resp;
    try {
      resp = yield usersSrvc.createUser(userMockData);
    } catch (e) {
      resp = e;
    }
    resp.should.be.an.Object();
    resp.userProfile.firstName.should.equal('test');
    resp.userProfile.lastName.should.equal('test');
    resp.userProfile.address.should.equal('test');
    resp.userProfile.company.should.equal('test');
  });

  it('will throw error if not able to create user', function* createUser() {
    const err = {
      statusCode: 500,
      message: 'Error',
    };
    modelMock.createOrUpdateDocument.returns(Promise.reject(err));
    let resp;
    try {
      resp = yield usersSrvc.createUser(userMockData);
    } catch (e) {
      resp = e;
    }
    resp.should.be.an.Object();
    resp.statusCode.should.equal(500);
  });
});
