/*
This file contains all the SQL queries required to create the database tables and manage the relationships between them. 
Using these queries, we will design and build the complete backend database structure.
*/



/* create table name 'patient' and their schema*/


CREATE TABLE patient (
    id SERIAL PRIMARY KEY,

    fName VARCHAR(20) NOT NULL,
    lName VARCHAR(20) NOT NULL,

    username VARCHAR(50) UNIQUE NOT NULL,
        CHECK (username ~ '^[A-Za-z0-9_]+$'),

    age INT NOT NULL
        CHECK (age BETWEEN 1 AND 150),

    gender VARCHAR(11) NOT NULL
        CHECK (gender IN ('male', 'female', 'transgender')),

    phoneNo VARCHAR(10) UNIQUE NOT NULL
        CHECK (phoneNo ~ '^[6-9][0-9]{9}$'),

    email VARCHAR(60) UNIQUE NOT NULL,

    password VARCHAR(500) NOT NULL
);


