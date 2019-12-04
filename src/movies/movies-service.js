const MoviesService = {
  getAllMovies(knex, user_id) {
    return knex.select('*').from('movies').where('user_id', user_id);
  },
  getFavoriteMovies(knex, user_id) {
    return knex.select('*').from('movies').where('user_id', user_id).where('favorite', true);
  },
  getById(knex, id, user_id) {
    return knex.from('movies').select('*').where('id', id).where('user_id', user_id).first();
  },
  insertMovie(knex, newMovie) {
    return knex
      .insert(newMovie)
      .into('movies')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  deleteMovie(knex, id) {
    return knex('movies')
      .where({ id })
      .delete();
  },
  updateMovie(knex, id, newMovieFields) {
    return knex('movies')
      .where({ id })
      .update(newMovieFields);
  },
};

module.exports = MoviesService;