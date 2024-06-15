const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "twitter_db",
});

app.post("/create", (req, res) => {
  const user_handle = req.body.user_handle;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phonenumber = req.body.phonenumber;
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  db.query(
    "INSERT INTO users (user_id, user_handle, first_name, last_name, phonenumber, created_at) VALUES (?,?,?,?,?,?)",
    [null, user_handle, first_name, last_name, phonenumber, created_at],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const user_id = req.body.user_id;
  const user_handle = req.body.user_handle;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phonenumber = req.body.phonenumber;
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  db.query(
    "UPDATE users SET user_id=?, user_handle=?, first_name=?, last_name=?, phonenumber=?, created_at=? WHERE user_id=?",
    [ user_id, user_handle, first_name, last_name, phonenumber, created_at, user_id],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("empleado actualizado exitosamente");
      }
    }
  );
});

app.delete("/delete/:user_id", (req, res) => {
  const {user_id} = req.params;
  db.query("DELETE FROM users WHERE user_id = ?", [user_id], 
    (err, result) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.send(result);
    }
  })
});

app.listen(3001, () => {
  console.log("Corriendo exitosamente!");
});
