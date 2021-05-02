/*-------------- Autenticación --------------------*/
var usuario = "";
//Método para revisar el estado de sesión del usuario
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario en sesión
    console.log(user.displayName);
    usuario = user.uid;
    console.log("Auth: En Sesión");
  } else {
    // No hay usuario en sesión
    console.log("Auth: No en Sesión");
  }
});

/*-------------- Firebase -------------------------*/
var consumo;
var medicionRef = firebase.database().ref("medicion_vol/");
//Método de observación de la base de datos 
medicionRef.on("value", (snapshot) => {
  consumo = snapshot.val();
  console.log("Consumo: " + consumo)
});

/*----------Selección Manual (Limte de Consumo) Firestore -----------*/
const signInForm = document.querySelector("#manual-form");

signInForm.addEventListener("submit", (e) => { 
  console.log("Entro")
  e.preventDefault();
  var numero = parseInt(document.querySelector('#numero').value);
  console.log("Recibi el número: " + numero)
  const db = firebase.firestore();
  var docRef = db.collection("usuario").doc(usuario);

  firebase.database().ref().update({
    limite: numero
  });

  return docRef.update({
    consumoLimite: numero
  })
  .then(() => {
    console.log("Document successfully updated!");
  })
  .catch((error) => {
    // El documento no existe
    console.error("Error updating document: ", error);
  });
});

/*-------------- Función Botones ------------------*/

//Constantes
const medir = document.querySelector("#medir");

const config1 = document.querySelector("#config1");
const config2 = document.querySelector("#config2");

const configA = document.querySelector("#configA");
const configB = document.querySelector("#configB");
const configC = document.querySelector("#configC");

/*---------------- Listeners -----------------------*/
config1.addEventListener("click", automatico);
config2.addEventListener("click", manual);

configA.addEventListener("click", auditiva);
configB.addEventListener("click", visual);
configC.addEventListener("click", ambas);

medir.addEventListener("click", medicion);


/*------------- Establecer Configuración -----------------------*/ 
var indSeleccion; //Indice para la configuración de selección de objetivo
var indAlarma;    //Indice para la configuración de alarma de consumo
var indMedicion;  //Indice para la configuración de iniciar/parar medición

setMedicion();
setSeleccion();
setAlarma();

function setSeleccion(){
 indSeleccion = localStorage.getItem("indSeleccion");
 if(indSeleccion == 0){ automatico()}
 else if(indSeleccion == 1){ manual()}
 else{};
}

function setAlarma(){
  indAlarma = localStorage.getItem("indAlarma");
  if(indAlarma == 0){ auditiva()}
  else if(indAlarma == 1){ visual()}
  else if(indAlarma == 2){ ambas()}
  else{};
}

function setMedicion(){
  indMedicion = localStorage.getItem("indMedicion");
  if(indMedicion == null){
    indMedicion=0;
  } 
  else;
  if(indMedicion == 1){
    indMedicion = 0;
    document.getElementById("medicion").innerHTML = "";
    document.getElementById("medicion").innerHTML = "Parar Medición";
  }
  else{
    indMedicion = 1;
    document.getElementById("medicion").innerHTML = "Iniciar Medición";
  }
}

function medicion(){
  if(indMedicion == 0){
    indMedicion++;
    //obtenerDato();
    guardarDia();
    console.log("Para culo: 0");
    localStorage.setItem("indMedicion", 0);
    firebase.database().ref().update({
      iniciar: 0
    });
    document.getElementById("medicion").innerHTML = "Iniciar Medición";
  }
  else{
    indMedicion = 0;
    localStorage.setItem("indMedicion", 1);
    document.getElementById("medicion").innerHTML = "";
    document.getElementById("medicion").innerHTML = "Parar Medición";
    firebase.database().ref().update({
      iniciar: 1
    });
    console.log("Inicia culo: 1");
  }
}

function automatico(){
localStorage.setItem("indSeleccion", 0);
document.getElementById("manual").style.display = "none";
document.getElementById("manual").style.visibility = "hidden";

var op1 = document.getElementById("config1");
var op2 = document.getElementById("config2");

op1.style.background = "rgb(116,0,184)";
op1.style.color = "white";

op2.style.background = "white";
op2.style.color = "black";
}

function manual(){
localStorage.setItem("indSeleccion", 1);
document.getElementById("manual").style.display = "block";
document.getElementById("manual").style.visibility = "visible";

var op1 = document.getElementById("config1");
var op2 = document.getElementById("config2");

op1.style.background = "white";
op1.style.color = "black";

op2.style.background = "rgb(116,0,184)";
op2.style.color = "white";
}

function auditiva(){
  localStorage.setItem("indAlarma", 0);
  var opA = document.getElementById("configA");
  var opB = document.getElementById("configB");
  var opC = document.getElementById("configC");

  opA.style.background = "rgb(116,0,184)";
  opA.style.color = "white";

  opB.style.background = "white";
  opB.style.color = "black";

  opC.style.background = "white";
  opC.style.color = "black";
}

function visual(){
  localStorage.setItem("indAlarma", 1);
  var opA = document.getElementById("configA");
  var opB = document.getElementById("configB");
  var opC = document.getElementById("configC");

  opA.style.background = "white";
  opA.style.color = "black";

  opB.style.background = "rgb(116,0,184)";
  opB.style.color = "white";

  opC.style.background = "white";
  opC.style.color = "black";
}

function ambas(){
  localStorage.setItem("indAlarma", 2);
  var opA = document.getElementById("configA");
  var opB = document.getElementById("configB");
  var opC = document.getElementById("configC");

  opA.style.background = "white";
  opA.style.color = "black";

  opB.style.background = "white";
  opB.style.color = "black";

  opC.style.background = "rgb(116,0,184)";
  opC.style.color = "white";
}

function guardarDia(){
  const db = firebase.firestore();
  var docRef = db.collection("usuario").doc(usuario);
  var fecha = new Date();

  var dia = fecha.getDay();
  if(dia == 1){
    return docRef.update({ lunes : consumo })
      .then(() => {console.log("Documento Lunes correctament actualizado");})
      .catch((error) => {console.error("Error actualizando el documento: ", error);});
  }
  else if(dia == 2){
    return docRef.update({ martes : consumo })
    .then(() => {console.log("Documento Martes correctament actualizado");})
    .catch((error) => {console.error("Error actualizando el documento: ", error);});
  }
  else if(dia == 3){
    return docRef.update({ miercoles : consumo })
    .then(() => {console.log("Documento Miercoles correctament actualizado");})
    .catch((error) => {console.error("Error actualizando el documento: ", error);});
  }
  else if(dia == 4){
    return docRef.update({ jueves : consumo })
    .then(() => {console.log("Documento Jueves correctament actualizado");})
    .catch((error) => {console.error("Error actualizando el documento: ", error);});
  }
  else if(dia == 5){
    return docRef.update({ viernes : consumo })
    .then(() => {console.log("Documento Viernes correctament actualizado");})
    .catch((error) => {console.error("Error actualizando el documento: ", error);});
  }
  else if(dia == 6){
    return docRef.update({ sabado : consumo })
    .then(() => {console.log("Documento Sabado correctament actualizado");})
    .catch((error) => {console.error("Error actualizando el documento: ", error);});
  }
  else if(dia == 0){
    return docRef.update({ domingo : consumo })
    .then(() => {console.log("Documento Domingo correctament actualizado");})
    .catch((error) => {console.error("Error actualizando el documento: ", error);});
  }
  else;
}

