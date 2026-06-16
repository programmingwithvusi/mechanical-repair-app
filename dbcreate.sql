

-- Create a dedicated user with password (if not already created)
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'postgres') THEN
      CREATE ROLE postgres LOGIN PASSWORD 'postgres';
   END IF;
END
$$;

-- Grant privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE repairapp TO postgres;