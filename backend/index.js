const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

const pool = new Pool({
  host: "db",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "testdb"
});

pool.query("select 1")
  .then(() => console.log("db connecte"))
  .catch(err => console.error("erreur db", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend ok");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`serveur running sur ${PORT}`);
});