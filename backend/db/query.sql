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


/* create department table */

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
);

/* Ask cluade ai to give a list of hospital department */
INSERT INTO departments (department_name)
VALUES
        ('Emergency Department (ED / A&E)'),
        ('Intensive Care Unit (ICU)'),
        ('Neonatal Intensive Care Unit (NICU)'),
        ('Pediatric Intensive Care Unit (PICU)'),
        ('General Medicine'),
        ('General Surgery'),
        ('Cardiology'),
        ('Cardiac Surgery'),
        ('Neurology'),
        ('Neurosurgery'),
        ('Orthopedics'),
        ('Oncology'),
        ('Radiation Oncology'),
        ('Hematology'),
        ('Gynecology & Obstetrics (OB/GYN)'),
        ('Neonatology'),
        ('Pediatrics'),
        ('Dermatology'),
        ('Ophthalmology'),
        ('ENT (Ear Nose & Throat / Otolaryngology)'),
        ('Urology'),
        ('Nephrology'),
        ('Gastroenterology'),
        ('Hepatology'),
        ('Pulmonology / Respiratory Medicine'),
        ('Endocrinology'),
        ('Rheumatology'),
        ('Psychiatry & Mental Health'),
        ('Psychology'),
        ('Anesthesiology'),
        ('Pathology'),
        ('Radiology & Imaging'),
        ('Nuclear Medicine'),
        ('Plastic & Reconstructive Surgery'),
        ('Vascular Surgery'),
        ('Colorectal Surgery'),
        ('Maxillofacial Surgery'),
        ('Transplant Surgery'),
        ('Physiotherapy & Rehabilitation'),
        ('Occupational Therapy'),
        ('Speech & Language Therapy'),
        ('Pharmacy'),
        ('Dietetics & Nutrition'),
        ('Social Work'),
        ('Palliative Care'),
        ('Blood Bank & Transfusion'),
        ('Microbiology & Infectious Disease'),
        ('Immunology & Allergy'),
        ('Forensic Medicine'),
        ('Medical Records & Health Information');

/* create doctors table */

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(60) NOT NULL,
    age INT NOT NULL
        CHECK (age BETWEEN 25 AND 80),
    gender VARCHAR(11) NOT NULL
        CHECK (gender IN ('male', 'female', 'transgender')),
    phone_no VARCHAR(10) UNIQUE NOT NULL
        CHECK (phone_no ~ '^[6-9][0-9]{9}$'),
    email VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    experience VARCHAR(20) NOT NULL
    /* ask claude to give regex for a table for "experience" column name where its checks for 1year or 1month and fresher is allowed he give you some regex */
        CHECK (experience ~ '^(\d+\s(year|years|month|months)|fresher)$'),
    
    department_id INT NOT NULL,

    CONSTRAINT fk_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE RESTRICT
);
