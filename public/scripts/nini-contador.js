
let num = 0;
document.getElementById("num").innerText = num;
function add(){

    num++;
    document.getElementById("num").innerText = num;
    document.getElementById("horarioHist").innerText = hora+":"+minutos+":"+segundos
}

function reset(){
    num = 0;
    document.getElementById("num").innerText = num;
    document.getElementById("horarioHist").innerText = ""
}
function relogio(){
    info = new Date()
    hora = info.getHours();
    minutos = info.getMinutes();
    segundos = info.getSeconds();

    if(hora < 10){
        hora= "0" +hora;
    }

    if(minutos < 10){
        minutos = "0" +minutos;
    }

    if(segundos < 10){
        segundos = "0" + segundos;
    }

    document.getElementById("horario").innerText = hora+":"+minutos+":"+segundos
}
var timer = setInterval(relogio, 1000)