const express = require('express')
const app = express()
app.use(express.json())
const dbConnection = require('./index')
const db = dbConnection()

app.post('/usuarios', async (req, res) => {
    const {nome, email} = req.body
    try{
        const result = await db.run(`INSERT INTO usuarios (nome, email) VALUES ('Ramon', 'ramon.brignoli@edu.sc.senai.br')`)
        res.status(201).json(({msg: "Criado com sucesso"}))
    }catch(err){
        res.status(500).json({msg: `${err.msg}`})
    }
})

app.listen(8000, (req, res) => {
    console.log("Online Fi")
})