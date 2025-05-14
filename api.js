const sqlite = require('sqlite3')
const { open } = require('sqlite')
const express = require('express')
const app = express()
app.use(express.json())
let db

async function dbConnection() {
    try {
        const db = await open({
            filename: './banco.db',
            driver: sqlite.Database
        })        
        await db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`)
        await db.exec(`CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            tarefa TEXT NOT NULL UNIQUE
        )`)

        const usuarios = await db.all(`SELECT * FROM usuarios`)
        console.log(usuarios)

        return db
    } catch (err) {
        console.error(err)
    }
}

function usuario() {
    app.post('/usuarios', async (req, res) => {
        const { nome, email } = req.body
        try {
            const result = await db.run(`INSERT INTO usuarios (nome, email) VALUES (?, ?)`, [nome, email])
            res.status(201).json({ msg: "Usuário criado com sucesso" })
        } catch (err) {
            res.status(500).json({ msg: `${err.message}` })
        }
    })
}

function tarefas() {
    app.post('/tarefas', async (req, res) => {
        const { nome, tarefa } = req.body
        try {
            const result = await db.run(`INSERT INTO tarefas (nome, tarefa) VALUES (?, ?)`, [nome, tarefa])
            res.status(201).json({ msg: "Tarefa criada com sucesso" })
        } catch (err) {
            res.status(500).json({ msg: `${err.message}` })
        }
    })
}

dbConnection().then(retorno => {
    db = retorno
    usuario()
    tarefas()
})

app.listen(8000, () => {
    console.log("Online Fi")
})