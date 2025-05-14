const sqlite = require('sqlite3')
const { open } = require('sqlite')
const db = new sqlite.Database('./teste.db')

async function conectar() {
    const db = await open({
        filename: "./test.db",
        driver: sqlite.Database
    })
    execCommands()
}

function execCommands(){
    db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL
    )`)
    
    db.run('INSERT INTO usuarios ( nome ) VALUES ( ? )', ["Podre Paulo"])
    
    let result = db.all(`SELECT * from usuarios`)
    console.log(result)
}
conectar()