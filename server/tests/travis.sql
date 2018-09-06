
CREATE USER postgres WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION;
  
CREATE DATABASE IF NOT EXISTS "mtDatabaseTest"
  WITH 
  OWNER = postgres
  ENCODING = 'UTF8'
  LC_COLLATE = 'English_United States.1252'
  LC_CTYPE = 'English_United States.1252'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;
  
CREATE TABLE IF NOT EXISTS public.users
(
    userid SERIAL PRIMARY KEY NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    isadmin boolean NOT NULL DEFAULT false,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    UNIQUE (email),
    UNIQUE (username)
	
)

CREATE TABLE IF NOT EXISTS public.requests
(
    requestid SERIAL PRIMARY KEY NOT NULL,
    subject character varying(255) COLLATE pg_catalog."default" NOT NULL,
    priority character varying(255) COLLATE pg_catalog."default" NOT NULL,
    status character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT 'Pending'::character varying,
    requestType character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    userid integer NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    FOREIGN KEY (userid)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
