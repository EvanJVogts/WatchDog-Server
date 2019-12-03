CREATE TYPE movie_platform AS ENUM (
  'Netflix',
  'Hulu',
  'HBO',
  'Showtime',
  'Starz',
  'Disney+',
  'Amazon Prime',
  'Sling TV',
  'YouTube',
  'Cable Provider',
  'Playstation Vue'
);

ALTER TABLE movies
  ADD COLUMN
    platform movie_platform;