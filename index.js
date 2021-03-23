const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

app.use(bodyParser.json());

//Database
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbrestapi"
});

//Connection
conn.connect(err => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//Display all data
app.get("/api/mahasiswa", (req, res) => {
  let sql = "SELECT * FROM mahasiswa";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//Display data
app.get("/api/mahasiswa/:id", (req, res) => {
  let sql = "SELECT * FROM mahasiswa WHERE id_mahasiswa=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//Post new data
app.post("/api/mahasiswa", (req, res) => {
  let data = {
    nim: req.body.nim,
    nama: req.body.nama
  };
  let sql = "INSERT INTO mahasiswa SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//Update data
app.put("/api/mahasiswa/:id", (req, res) => {
  let sql =
    "UPDATE mahasiswa SET nim='" +
    req.body.nim +
    "', nama='" +
    req.body.nama +
    "' WHERE id_mahasiswa=" +
    req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//Delete data
app.delete("/api/mahasiswa/:id", (req, res) => {
  let sql = "DELETE FROM mahasiswa WHERE id_mahasiswa=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//port
app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
