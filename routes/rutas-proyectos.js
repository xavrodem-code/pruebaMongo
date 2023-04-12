const express = require('express');
const Proyecto = require("../models/models-proyectos");
const router = express.Router();

// Listado de todos los proyectos
router.get('/', async (req, res, next) => {
    let proyectos;
    try {
        proyectos = await Proyecto.find({});
    } catch (err) {
        const error = new Error("No ha podido ser esta vez, algo malo habrá hecho el desarrollador");
        error.code = 500;
        return next(error);
    }
    res.status(200).json({
        proyectos: proyectos,
    })
});

//Listar proyecto concreto
router.get('/:nombreProyecto', async (req, res, next) => {
    const projectName = req.params.nombreProyecto;
    let proyecto;
    try {
        proyecto = await Proyecto.findOne({nombreProyecto: projectName});
    } catch (err) {
        const error = new Error('Error en el servidor');
        error.code = 500;
        return next(error);
    }
    res.status(200).json({
        proyecto: proyecto,
    })
});

// Creación de nuevo proyecto
router.post("/", async (req, res, next) => {
    const {nombreProyecto, grupoSolista, estiloMusical, fechaLanzamiento, ventasPrevistas} = req.params.body;
    const nuevoProyecto = new Proyecto({nombreProyecto, grupoSolista, estiloMusical, fechaLanzamiento, ventasPrevistas});

    try {
        await nuevoProyecto.save();
    } catch(error) {
        const err = new Error ("Dificultades para posterlo");
        err.code = 500;
        return next(err);
    }
    res.status(201).json({
        proyecto: nuevoProyecto,
    });
})

// Modificación del estilo

router.put("/estilo/:nombreProyecto", async (req, res, next) => {
    const nombreProyecto = req.params.nombreProyecto;
    const nuevoEstilo = req.body.estiloMusical;
    let proyecto;
    try {
        proyecto = await Proyecto.findOneAndUpdate(
            {nombreProyecto: nombreProyecto},
            {estiloMusical: nuevoEstilo},
            {
                new: true,
                runValidators: true
            }
        );
    } catch (error) {
        res.status(404).json({
            mensaje: "Imposible añadir los nuevos cambios",
            error: error.message,
        });
        return next(error);
    }
    res.status(200).json({
        mensaje: "Actualización completada",
        proyecto: proyecto,
    })
});

// Modificación fecha

router.put("/fechaLanzamiento/:nombreProyecto", async (req, res, next) => {
    const nombreProyecto = req.params.nombreProyecto;
    const nuevaFecha = req.body.fechaLanzamiento;
    let proyecto;
    try {
        proyecto = await Proyecto.findOneAndUpdate(
            {nombreProyecto: nombreProyecto},
            {fechaLanzamiento: nuevaFecha},
            {
                new: true,
                runValidators: true
            }
        );
    } catch (error) {
        res.status(404).json({
            mensaje: "Imposible añadir los nuevos cambios",
            error: error.message,
        });
        return next(error);
    }
    res.status(200).json({
        mensaje: "Actualización completada",
        proyecto: proyecto,
    })
});

// Eliminar según id

router.delete("/:id", async(req, res, next) => {
    let proyecto;
    try {
        proyecto = await Proyecto.findByIdAndDelete(req.params.id);
    } catch (error) {
        res.status(404).json({
            mensaje: "No hemos podido aniquilar el tema",
            error: error.message,
        });
        return next(error);
    }
    res.json({
        mensaje: "proyecto borrado",
        proyecto: proyecto,
    })
})

module.exports = router;