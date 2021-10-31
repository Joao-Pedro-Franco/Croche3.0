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
function menu_display(rows){
    var menu_list = []
    var amigurumis = []
    
    for(let i = 0; i < rows.length; i++){
       amigurumis.push(rows[i].amigurumi)
    }

    for(let i = 0; i < amigurumis.length; i++){

        let verify = false
        if(i === 0){
            menu_list.push([amigurumis[0], 1])
        }
        else{
            for(let r = 0; r < menu_list.length; r++){
                if(menu_list[r][0] === amigurumis[i]){
                    menu_list[r][1]++;
                    verify = true
                    break
                }
            }
            if(verify === false){
                menu_list.push([amigurumis[i], 1])
            }
        }
    }
    return menu_list
}


server.get("/", (req, res) => {
    db.all(`SELECT * FROM historico`, function(err, rows){
        if (err){
            return console.log(err)
        }
        menu_list = menu_display(rows)
        menu_list.sort(function(a, b) {
            return b[1] - a[1];
        });
        // const unicornio = rows.filter((row) => (row.amigurumi === 'Unicórnio'))
        res.render("nini-menu.html", {menu_list: menu_list, unicornio})
    })
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

server.post("/anha", (req, res) =>{
    
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

server.post("/anhanha", (req, res)=>{
    db.run(`DELETE FROM historico WHERE id=?`, [req.body.id], function(err){
        if(err){
            return console.log(err)
        }
    })
    return res.redirect("/nini-encomendas")
})


server.listen(3001)