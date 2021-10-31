const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db


// db.serialize(() => {
//     // criar tabela
//     // db.run(`
//     //     CREATE TABLE IF NOT EXISTS historico (
//     //         id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //         nome TEXT,
//     //         amigurumi TEXT,
//     //         preco TEXT,
//     //         data TEXT
//     //     );
//     // `)
// //     // inserir dados
// //     const query = `
// //     INSERT INTO historico (
// //         nome,
// //         amigurumi,
// //         preco,
// //         data
// //     ) VALUES (?,?,?,?);
// //     `
// //     const values = [
// //         "Joao Pedro",
// //         "Totoro",
// //         "80",
// //         "23/08/2021"
// //     ]

// //     function afterInsertData(err){
// //         if(err){
// //             return console.log(err)
// //         }
// //         console.log("Cadastrado :)")
// //         console.log(this)
// //     }

// //     // db.run(query, values, afterInsertData)
// //     // consultar dados
//     db.all(`SELECT * FROM historico`, function(err, rows){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Aqui estao seus registros:")
//         console.log(rows)
//     })
// //     // deletar dados
// //     // db.run(`DELETE FROM historico WHERE id=?`, [1], function(err){
// //     //     if(err){
// //     //         return console.log(err)
// //     //     }
// //     //     console.log("Registro deletado com sucesso")
// //     // })

// })