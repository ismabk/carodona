let encenderMaquina = false;

function encender(){
    if(encenderMaquina === false){
    console.log("Encendiendo");
    document.getElementById('maquina').classList.add("encenderMaquina");
    document.getElementById('btn-nuevo').classList.add("encenderMaquina");
    encenderMaquina= true
    }
}
function apagar(){
    if(encenderMaquina === true){
    console.log("Apagando");
    document.getElementById('maquina').classList.add("apagarMaquina");
    document.getElementById('btn-nuevo').classList.add("apagarMaquina");
    encenderMaquina=false
    }
}
function precio(){
    console.log("Hola");
}
