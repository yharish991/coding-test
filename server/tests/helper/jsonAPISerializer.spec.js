const serializer = require('../../src/helper/jsonAPISerializer');

require('should');

describe('[JSON Api Serializer] User profile response serializer', () => {
  const data = {
    userProfile: {
      userId: 'test@us.ibm.com',
    },
  };

  it('user profile response will be in json api format', function* serialize() {
    const resp = serializer.userProfileSerializer(data, '1.0.0');
    resp.data.type.should.be.exactly('users');
    resp.data.attributes.should.have.ownProperty('userProfile');
    resp.jsonapi.version.should.be.exactly('1.0.0');
  });
});

describe('[JSON Api Serializer] Error response serializer', () => {
  const error = {
    statusCode: 500,
    message: 'err',
  };

  const anotherError = {
    statusCode: 404,
    error: JSON.stringify({
      errors: [
        {
          status: '404',
          title: '404 Entry was not found.',
          detail: 'User not found',
        },
      ],
    }),
  };

  it('error response will be in json api format', function* serialize() {
    const resp = serializer.errorSerializer(error, '1.0.0');
    resp.errors.should.be.an.Array();
    resp.jsonapi.version.should.be.exactly('1.0.0');
  });

  it('error response will be in json api format', function* serialize() {
    const resp = serializer.errorSerializer(anotherError, '1.0.0');
    resp.errors.should.be.an.Array();
    resp.jsonapi.version.should.be.exactly('1.0.0');
  });
});
