ALTER TABLE movies
  ADD COLUMN
    user_id integer references users(id)