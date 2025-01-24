const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config(); // Add this line

const app = express();
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("DB Connection Error:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Fetch the user by email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).send("Error retrieving user from DB");
        }

        if (result.length === 0) {
            return res.status(404).send("User not found");
        }

        // Compare the provided password with the hashed password
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err); // Log the error
                return res.status(500).send("Error comparing passwords");
            }

            if (!isMatch) {
                return res.status(401).send("Incorrect password");
            }

            res.status(200).send({ message: "Login successful" });
        });
    });
});



// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
