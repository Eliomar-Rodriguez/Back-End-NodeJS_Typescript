// importar el schema y modelo de mongoose
import { Schema, model } from "mongoose";

// hacemos el modelo
let EsquemaPersona: Schema = new Schema({
    Nombre: {
        type: String,
        default: '',
        required: true
    },
    Apellido1:{
        type: String,
        required: true
    },
    Apellido2:{
        type: String,
        required: false
    },
    Cedula:{
        type: Number,
        required: true
    },
    Edad:{
        type: Number,
        default: '',
        required: true
    },
    FechaNacimiento:{
        type: Date,
        required: true
    },
    Genero:{
        type: Boolean,
        required: true
    },
    Hijos:{
        type: Array,
        required: false
    }
})
export default model('Personas',EsquemaPersona) // para que sea accesible desde otros modulos al importarse