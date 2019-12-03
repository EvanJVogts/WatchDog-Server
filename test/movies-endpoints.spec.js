const knex = require('knex');
const app = require('../src/app');

describe('Movies Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  describe('GET /api/movies', () => {
    context('Given no movies', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/movies')
          .expect(200, []);
      });
    });
  });
});