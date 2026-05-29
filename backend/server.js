import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch((err) => console.error('Error connecting to PostgreSQL database:', err));

app.get('/patients', async (req, res) => { 
     res.send('Backend Running');
});

app.post("/patients/submit-data", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login successful",
        user: req.body.username
    });
});
app.listen(PORT, () => {  console.log(`Server running on port ${PORT}`); });