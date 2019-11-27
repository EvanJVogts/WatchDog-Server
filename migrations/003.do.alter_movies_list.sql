CREATE TYPE user_id

ALTER TABLE movies
  ADD COLUMN
    user_id integer references users(id)
