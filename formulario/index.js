const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'formulario'
  });
conexion.connect((err)=>{
    if (err){
    console.error("error al conectar", err);
    return;}
    console.log("conexion exitosa");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('./', express.static(path.join(__dirname, 'formulario.html')));
app.use( express.static(path.join(__dirname,'/25_reto2_CLTA'+ 'style.css')));
app.get("/", function (req, res) {
    var filePath = path.join(__dirname, "formulario.html");
    res.sendFile(filePath);
});

app.post('/enviarDatos', (req, res) => {
    const { nombre, apellido, edad, correo} = req.body;

    // Insertar datos en la base de datos
    const sql = 'INSERT INTO formulario (nombre, apellido, edad,correoElectronico ) VALUES (?, ?, ?, ?)';
    const values = [nombre, apellido, edad, correo];

    conexion.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la base de datos:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        console.log('Datos guardados correctamente');
        res.send('Datos guardados correctamente');
    });
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});