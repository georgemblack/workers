-- The email address each client receives. Clients created before this column
-- existed have NULL and get the default USER_EMAIL instead.
ALTER TABLE clients ADD COLUMN email TEXT;
