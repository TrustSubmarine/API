CREATE DATABASE amazon;

CREATE TABLE amazon (
    link_id VARCHAR(255) PRIMARY KEY,
    prod_name VARCHAR(255),
    link VARCHAR(255),
    score VARCHAR(5),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

DROP TABLE amazon;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE amazon (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    link TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_desc TEXT NOT NULL,
    score DECIMAL(2, 1) DEFAULT 0 NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    is_calc BOOLEAN NOT NULL
);