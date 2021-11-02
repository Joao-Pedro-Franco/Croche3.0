const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db


// db.serialize(() => {
//     // criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS amigurumis (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             amigurumi TEXT,
//             imagem TEXT
//         );
//     `)
//     // inserir dados
//     const query = `
//     INSERT INTO amigurumis (
//         amigurumi,
//         imagem
//     ) VALUES (?,?);
//     `
//     const values = [
//         "Abelinha", 
//         "https://i.imgur.com/Psdb8HM.jpg"
//     ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Cadastrado :)")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)
// //     // consultar dados
//     // db.all(`SELECT * FROM historico`, function(err, rows){
//     //     if(err){
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estao seus registros:")
//     //     console.log(rows)
//     // })
// //     // deletar dados
// //     // db.run(`DELETE FROM historico WHERE id=?`, [1], function(err){
// //     //     if(err){
// //     //         return console.log(err)
// //     //     }
// //     //     console.log("Registro deletado com sucesso")
// //     // })

// })