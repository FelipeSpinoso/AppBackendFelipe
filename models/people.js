const mongoose = require('mongoose')
const peopleSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,

    },
    SobreNome:{
        type: String,
        required: true,

    },
    numero:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    foto:{
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('contato', peopleSchema)