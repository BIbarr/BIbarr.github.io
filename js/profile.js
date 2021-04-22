
var i = 0;
var j = 0;
var mayor = 0;

var litros  = [700,500,400,300,700];
var valores = ["0%","0%","0%","0%","0%"];

if(litros[0]>=litros[1] && litros[0]>=litros[2] && litros[0]>=litros[3] && litros[0]>=litros[4]){
  mayor = litros[0];
}
else if (litros[1]>=litros[0] && litros[1]>=litros[2] && litros[1]>=litros[3] && litros[1]>=litros[4]) {
  mayor = litros[1];
} 
else if(litros[2]>=litros[0] && litros[2]>=litros[1] && litros[2]>=litros[3] && litros[2]>=litros[4]){
  mayor = litros[2];
}
else if(litros[3]>=litros[0] && litros[3]>=litros[1] && litros[3]>=litros[2] && litros[3]>=litros[4]){
  mayor = litros[3];
}
else {
  mayor = litros[4];
}

console.log(mayor);

for(i=0;i<5;i++){
valores[i]=((litros[i]*100)/mayor)+"%";
}

for(i=0;i<5;i++){
  console.log(valores[i]);
}

var lunes = document.getElementById("lunes");
lunes.style.width = valores[0];

var martes = document.getElementById("martes");
martes.style.width = valores[1];

var miercoles = document.getElementById("miercoles");
miercoles.style.width = valores[2];

var jueves = document.getElementById("jueves");
jueves.style.width = valores[3];

var viernes = document.getElementById("viernes");
viernes.style.width = valores[4];