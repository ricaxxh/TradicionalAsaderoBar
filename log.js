// log.js
const express = require("express");
const app = express();
const mysql = require("mysql");

// Creando conexión con la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db"
});

// Iniciando la conexión con la base de datos
connection.connect();

// Ruta para recibir los datos del formulario
app.post("/log.js", (req, res) => {
  // Recibiendo los datos del formulario
  let username = req.body.username;
  let password = req.body.password;

  // Creando la consulta sql
  let sql =
    "SELECT * FROM users WHERE username = '" +
    username +
    "' AND password = '" +
    password +
    "'";

  // Ejecutando la consulta
  connection.query(sql, (err, results) => {
    // Si hay algún error
    if (err) {
      console.log(err);
      res.status(500).send("Error en el servidor.");
    } else {
      // Si los datos coinciden
      if (results.length > 0) {
        res.redirect("/home");
      } else {
        res.send("Usuario o contraseña incorrecta.");
      }
    }
  });
});

// Iniciando el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado...");
});