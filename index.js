const sqlite = require('sqlite3')
const { open } = require('sqlite')

//criar uma conexao com o banco

async function dbConnection() {
    try{
        const db = await open({
            filename: './banco.db',
            driver: sqlite.Database
        })        
        await db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`)

        // await db.run(`INSERT INTO usuarios (nome, email) VALUES ('Ramon', 'ramon.brignoli@edu.sc.senai.br')`)

        const usuarios = await db.all(`SELECT * FROM usuarios`)
        console.log(usuarios)

        return db
    }catch(err){
        console.error(err)
    }
}

module.exports = dbConnection

// executar um script simples de criação de tabela
// executar um script simples adicionando usuario
//executar um script simples de leitura na tabela
//encerrando a conexao