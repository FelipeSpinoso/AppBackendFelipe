const inicializaMongo = require('./database/db')
const express = require('express')
require("dotenv").config()

const rotaContatos = require('./routes/contatos')

inicializaMongo()
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        versao: '1.0'
    })

})

app.use("/v1", rotaContatos)

app.use(function(req, res){
    res.status(404).json({
        menssage: `a rota ${req.originalUrl} não existe`
    })
})

app.listen(process.env.PORT, (req, res) => {
    console.log('Funcionando')
})
