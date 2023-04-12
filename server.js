const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(express.json());

const rutasProyectos = require('./routes/rutas-proyectos');
app.use('api/proyectos', rutasProyectos);

app.use((req, res) => {
    res.status(404);
    res.json({
        mensaje: "Los datos no se encuentran",
    })
})
mongoose
    .connect(
        "mongodb+srv://xavrodem:Javichu996@cluster0.eiuvjey.mongodb.net/proyectos?retryWrites=true&w=majority"
    )
    .then (() => {
        console.log("Conexión con la base de datos exitosa");
    })
    .then(() => {
        app.listen(5000, () => console.log('Listening on port 5000...'));
    })
    .catch((error) => console.log(error));

