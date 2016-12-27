var restUnitTest = require('./lib/rest-unittest')

restUnitTest.listResources('/api/v1/coordinates')
restUnitTest.createResources('/api/v1/coordinates', '../data/api/user.json')
