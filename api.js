const sqlite = require('sqlite3')
const { open } = require('sqlite')
const express = require('express')
const app = express()
app.use(express.json())
let db

async function conectar() {
    db = await open({
        filename: './banco.db',
        driver: sqlite.Database
    })   
    return db
}

async function dbConnection() {
    try {     
        db = await conectar()
        await db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`)
        await db.exec(`CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            tarefa TEXT NOT NULL UNIQUE,
            descricao TEXT NOT NULL,
            status TEXT NOT NULL,
            FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
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
        const { tarefa, descricao, status, usuario_id } = req.body
        try {
            const result = await db.run(`INSERT INTO tarefas (tarefa, descricao, status, usuario_id) VALUES (?, ?, ?, ?)`, [ tarefa, descricao, status, usuario_id])
            res.status(201).json({ msg: "Tarefa criada com sucesso" })
        } catch (err) {
            res.status(500).json({ msg: `${err.message}` })
        }
    })
}

dbConnection().then(() => {
    usuario()
    tarefas()
    app.listen(8000, () => {
        console.log("Online Fi")
    })
})