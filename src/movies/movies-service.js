const MoviesService = {
  getAllMovies(knex) {
    // console.log('knex', knex);
    // console.log(knex);
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
    return knex('movies')
      .where({ id })
      .update(newMovieFields);
  },
};

module.exports = MoviesService;



// const MoviesService = {
//   getAllMovies(knex) {
//     // console.log('knex', knex);
//     // console.log(knex);
//     return knex
//       .from('movies AS mov')
//       .select('*');
//   },
//   getById(knex, id) {
//     return MoviesService.getAllArticles(knex).where('id', id).first();
//   },
//   insertMovie(knex, newMovie) {
//     return knex
//       .insert(newMovie)
//       .into('movies')
//       .returning('*')
//       .then(rows => {
//         return rows[0];
//       });
//   },
//   deleteMovie(knex, id) {
//     return knex('movies')
//       .where({ id })
//       .delete();
//   },
//   updateMovie(knex, id, newMovieFields) {
//     return knex('movies')
//       .where({ id })
//       .update(newMovieFields);
//   },
//   serializeArticle(movie) {
//     const { user } = movie;
//     return {
//       id: movie.id,
//       title: xss(movie.title),
//       rating: xss(movie.rating),
//       comments: xss(movie.comments),
//       user: {
//         id: user.id,
//         user_name: user.email,
//       },
//     };
//   },
// };

// module.exports = MoviesService;