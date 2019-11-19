const MoviesService = {
  getAllMovies(knex) {
    return knex.select('*').from('movies');
  },
  getById(knex, id) {
    return knex.from('movies').select('*').where('id', id).first();
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
    return knex('bookmarks')
      .where({ id })
      .update(newMovieFields);
  },
};

module.exports = MoviesService;