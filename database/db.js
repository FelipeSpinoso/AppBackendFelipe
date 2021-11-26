const mongoose = require('mongoose')
require("dotenv").config()
const mongoUri = process.env.DBURI
const inicializaMongo = async() => {
    try {
        await mongoose.connect(mongoUri, {

            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        console.log('banco conectado')
    } catch (error) {
        console.error(error)
        throw error
    }
}
module.exports = inicializaMongo

