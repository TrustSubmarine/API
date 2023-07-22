CREATE DATABASE amazon;

CREATE TABLE amazon (
    link_id VARCHAR(255) PRIMARY KEY,
    prod_name VARCHAR(255),
    link VARCHAR(255),
    score VARCHAR(5),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);