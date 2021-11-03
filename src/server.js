const express = require("express")
const server = express()

const db = require("./database/db")

server.use(express.static('public'));

// req.body
server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

function create_list(rows, rows2){
    const final_list = []

    for(i = 0; i<rows.length; i++){
        let verify = false
        for(r = 0; r<rows2.length; r++){
            if(rows[i].amigurumi === rows2[r].amigurumi){
                final_list.push({card: rows[i], cont: rows2[r].cont})
                verify = true
                break
            }
        }
        if(verify === false){
            final_list.push({card: rows[i], cont: 0})
        }
    }
    return final_list
}

server.get("/", (req, res) => {

    db.all(`SELECT * FROM amigurumis`, function(err, rows){
        if (err){
            return console.log(err)
        }
        db.all(`SELECT amigurumi, COUNT(*) AS cont FROM historico GROUP BY amigurumi ORDER BY 2 DESC`, function(err, rows2){
            if (err){
                return console.log(err)
            }
            
            final = create_list(rows, rows2)
            final.sort(function(a, b) {
                if (a.card.amigurumi > b.card.amigurumi) {
                    return 1;
                  }
                  if (a.card.amigurumi < b.card.amigurumi) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            });
            final.sort(function(a, b) {
                if (a.cont > b.cont) {
                    return -1;
                  }
                  if (a.cont < b.cont) {
                    return 1;
                  }
                  // a must be equal to b
                  return 0;
            });
            res.render("nini-menu.html", {amigurumi_list: rows, final})
        })
    })
})

server.post("/adicionarmenu", (req, res) => {
    const query = `
    INSERT INTO amigurumis (
        amigurumi,
        imagem
    ) VALUES (?,?);
    `
    const values = [
        req.body.amigurumi,
        req.body.imagem
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        
        return res.redirect('/')
    }

    db.run(query, values, afterInsertData)
})
server.post("/deletarmenu", (req, res) => {
    db.run(`DELETE FROM amigurumis WHERE id=?`, [req.body.id], function(err){
        if(err){
            return console.log(err)
        }
    })
    console.log(req.body.id)
    return res.redirect("/")
})

server.get("/nini-contador", (req, res) => {
    return res.render("nini-contador.html")
})

server.get("/nini-encomendas", (req, res) => {
    
    db.all(`SELECT * FROM historico`, function(err, rows){
        if (err){
            return console.log(err)
        }
        res.render("nini-encomendas.html", {historico: rows})
    })
})

server.post("/adicionar", (req, res) =>{
    
    // inserir dados
    const query = `
    INSERT INTO historico (
        nome,
        amigurumi,
        preco,
        data
    ) VALUES (?,?,?,?);
    `
    const values = [
        req.body.nome,
        req.body.amigurumi,
        req.body.preco,
        req.body.data,
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        
        return res.redirect('/nini-encomendas')
    }

    db.run(query, values, afterInsertData)
})

server.post("/deletar", (req, res)=>{
    db.run(`DELETE FROM historico WHERE id=?`, [req.body.id], function(err){
        if(err){
            return console.log(err)
        }
    })
    return res.redirect("/nini-encomendas")
})


server.listen(3001)