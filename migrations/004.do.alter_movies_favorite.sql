CREATE TYPE favorite_movie AS ENUM (
  'Yes',
  'No'
);

ALTER TABLE movies
  ADD COLUMN
    favorite favorite_movie;