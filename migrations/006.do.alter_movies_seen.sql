CREATE TYPE seen_movie AS ENUM (
  'Yes',
  'No'
);

ALTER TABLE movies
  ADD COLUMN
    seen seen_movie;