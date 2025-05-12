const express = require('express')
const app = express()
app.use(express.json())
const dbConnection = require('./index')
let db
dbConnection().then(retorno => {
    db = retorno
})


app.post('/usuarios', async (req, res) => {
    const {nome, email} = req.body
    try{
        const result = await db.run(`INSERT INTO usuarios (nome, email) VALUES (?, ?)`, [nome, email])
        res.status(201).json(({msg: "Criado com sucesso"}))
    }catch(err){
        res.status(500).json({msg: `${err.message}`})
    }
})

app.listen(8000, (req, res) => {
    console.log("Online Fi")
})