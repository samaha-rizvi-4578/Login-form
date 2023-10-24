const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});
// Create 'login' table if it does not exist
const createTableQuery = `CREATE TABLE IF NOT EXISTS login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
)`;
db.query(createTableQuery, function (err, result) {
    if (err) throw err;
    console.log("Table 'login' created or already exists");
});

//api
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error: ", err);
            res.status(500).json({ error: "Error occurred while inserting data into the database" });
        } else {
            console.log("Data inserted successfully");
            res.status(200).json({ message: "Data inserted successfully" });
        }
    });
});



// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO login (name, email, password) VALUES ('samaha', 'samahabatool7@gmail.com', 'abcd')";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
//   });

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    const values = [email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error: ", err);
            res.status(500).json({ error: "Error occurred while querying the database" });
        } else {
            if (result.length > 0) {
                res.status(200).json("Success");
            } else {
                res.status(200).json("Invalid");
            }
        }
    });
});


app.listen(8081, () => {
    console.log("Listening");
});
