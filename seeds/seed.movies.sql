BEGIN;

TRUNCATE
  movies,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (first_name, last_name, email, password)
VALUES
  ('Bob', 'Ross', 'paintings@gmail.com', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('Test', 'Account', 'watchdogtestaccount@gmail.com', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('Second', 'Testaccount', 'watchdogtestaccount2@gmail.com', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK');

INSERT INTO movies (title, rating, comments)
VALUES
  ('Example Movie #1', '5', 'Comments for the 1st example movie'),
  ('Example Movie #2', '4', 'Comments for the 2nd example movie'),
  ('Example Movie #3', '5', 'Comments for the 3rd example movie');

COMMIT;