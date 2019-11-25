const path = require('path');
const express = require('express');
const xss = require('xss');
const logger = require('../logger');
const MoviesService = require('./movies-service');
const { getMovieValidationError } = require('./movies-validator');
const { requireAuth } = require('../middleware/jwt-auth');

const moviesRouter = express.Router();
const bodyParser = express.json();

const serializeMovie = movie => ({
  id: movie.id,
  title: xss(movie.title),
  comments: xss(movie.comments),
  rating: Number(movie.rating),
});

moviesRouter
  .route('/')

  .get((req, res, next) => {
    // console.log('getAllMovies');
    MoviesService.getAllMovies(req.app.get('db'))
      .then(movies => {
        res.json(movies.map(serializeMovie));
      })
      .catch(next);
  })

  .post(bodyParser, (req, res, next) => {
    const { title, comments, rating } = req.body;
    const newMovie = { title, comments, rating };

    for (const field of ['title', 'comments', 'rating']) {
      if (!newMovie[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        });
      }
    }

    const error = getMovieValidationError(newMovie);

    if (error) return res.status(400).send(error);

    MoviesService.insertMovie(
      req.app.get('db'),
      newMovie
    )
      .then(movie => {
        logger.info(`Movie with id ${movie.id} created.`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${movie.id}`))
          .json(serializeMovie(movie));
      })
      .catch(next);
  });


moviesRouter
  .route('/:movie_id')
  .all(requireAuth)
  .all((req, res, next) => {
    const { movie_id } = req.params;
    MoviesService.getById(req.app.get('db'), movie_id)
      .then(movie => {
        if (!movie) {
          logger.error(`Movie with id ${movie_id} not found.`);
          return res.status(404).json({
            error: { message: 'Movie Not Found' }
          });
        }

        res.movie = movie;
        next();
      })
      .catch(next);

  })

  .get((req, res) => {
    console.log(res.movie);
    return (
      res.json(serializeMovie(res.movie))
    );
  })

  .delete((req, res, next) => {
    const { Movie_id } = req.params;
    MoviesService.deleteMovie(
      req.app.get('db'),
      Movie_id
    )
      .then(numRowsAffected => {
        logger.info(`Movie with id ${Movie_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(bodyParser, (req, res, next) => {
    const { title, comments, rating } = req.body;
    const movieToUpdate = { title, comments, rating };

    const numberOfValues = Object.values(movieToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message: 'Request body must content either \'title\', \'comments\' or \'rating\''
        }
      });
    }

    const error = getMovieValidationError(movieToUpdate);

    if (error) return res.status(400).send(error);

    MoviesService.updateMovie(
      req.app.get('db'),
      req.params.movie_id,
      movieToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = moviesRouter;