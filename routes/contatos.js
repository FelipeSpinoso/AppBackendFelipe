const express  = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const Contato = require('../models/people')
const validaContato = [
    check("nome", "O nome da pessoa é obrigatorio").not().isEmpty(),
    check("SobreNome", "O Sobrenome da pessoa é obrigatorio").not().isEmpty(),
    check("numero", "O numero da pessoa é obrigatorio").not().isEmpty(),
    check("email", "O email da pessoa é obrigatorio").not().isEmpty(),
    check("foto", "A foto da pessoa é obrigatorio").not().isEmpty(),
]

router.get('/', async (req, res) => {
    res.json({
        menssage: 'funcinando'
    })
})
router.post('/contato',validaContato, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        let contato = new Contato(req.body)
        await contato.save()
        res.send(contato)
    } catch (error) {
        return res.status(500).json([{errors: `erro ao salvar contato: ${error.message}`}])
    }
})
router.put('/contato',validaContato, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        let dados = req.body
        await Contato.findByIdAndUpdate(req.body._id, {$set: dados}, {new: true}).then(Contato => {
            res.send({message: `o contato de nome ${Contato.nome} foi alterado com sucesso`})

        }).catch(err => {
            return res.status(500).send({message:`Erro ao alterar o contato com o código ${req.body._id}`})
        })
    } catch (error) {
        return res.status(500).json([{errors: `Erro ao alterar o contato com o código ${req.body._id}`}])
    }
})
router.get('/contato/:nome', async (req, res) => {
   
    try {
        const contato = await Contato.find({"nome": req.params.nome})
        if(!contato) {
            res.status(500).send({errors: `não foi possivel obter o contato com o nome: ${req.params.nome}`})

        }
        res.json(contato)
    } catch (error) {
        return res.status(500).json([{errors: `não foi possivel obter o contato com o nome: ${req.params.nome}`}])
    }
})
router.get('/contato/', async (req, res) => {
   
    try {
        const contatos = await Contato.find()
        res.json(contatos)
   
    } catch (error) {
        return res.status(500).json([{errors: `não foi possivel obter os contatos`}])
    }
})
router.delete('/contato/:id', async (req, res) => { 
 await Contato.findByIdAndRemove(req.params.id).then(contato => {
     res.send({message: `O contato ${contato.nome} foi removido com sucesso`})
 })
 .catch(err => {
     return res.status(500).json({message: `Não foi possivel excluir o contato de Id ${req.params.id}`})
 })
})
module.exports = router
