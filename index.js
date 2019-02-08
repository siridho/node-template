const express = require("express");

const server = express();
const PORT = process.env.PORT || 3000;
const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

server.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome to the begining of nothingness" })
);

server.get("/pool", (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("Connect to postgres");
    }
  });
});
