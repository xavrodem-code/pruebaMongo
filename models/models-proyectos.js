const mongoose = require("mongoose");

const proyectoSchema = new mongoose.Schema({
    nombreProyecto: {
        type: String,
        required: true,
        trim: true,
    },
    grupoSolista: {
        type: String,
        required: true,
        trim: true,
    },
    estiloMusical: {
        type: String,
        required: true,
        trim: true,
    },
    fechaLanzamiento: {
        type: String,
        required: true,
        trim: true,
    },
    ventasPrevistas: {
        type: Number,
        min: 5,
        required: true,
    }
});

module.exports = mongoose.model("Proyecto", proyectoSchema);