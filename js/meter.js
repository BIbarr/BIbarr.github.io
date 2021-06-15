/*-------------- Autenticación --------------------*/
var usuario = "";
//Método para revisar el estado de sesión del usuario
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario en sesión
    console.log(user.displayName);
    usuario = user.uid;
    console.log("Auth: En Sesión");
    setConfiguracion();
    escucha(usuario);
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
  console.log("Consumo Realtime Database: " + consumo);
});

/*----------Selección Manual (Limte de Consumo) Firestore -----------*/
const signInForm = document.querySelector("#manual-form");

signInForm.addEventListener("submit", (e) => {
  console.log("Entro");
  e.preventDefault();
  var numero = parseInt(document.querySelector("#numero").value);
  console.log("Recibi el número: " + numero);
  const db = firebase.firestore();
  var docRef = db.collection("usuario").doc(usuario);

  return docRef
    .update({
      consumoLimite: numero,
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

medir.addEventListener("click", valorMedicion);

/*------------- Establecer Configuración -----------*/
setMedicion();
setObjetivo();
setAlarma();

function setObjetivo(indObjetivo) {
  if (indObjetivo == 0) {
    automatico();
  } else if (indObjetivo == 1) {
    manual();
  } else {
  }
}

function setAlarma(indAlarma) {
  if (indAlarma == 0) {
    auditiva();
  } else if (indAlarma == 1) {
    visual();
  } else if (indAlarma == 2) {
    ambas();
  } else {
  }
}

function setMedicion(indMedicion) {
  //indMedicion = localStorage.getItem("indMedicion");
  if (indMedicion == null) {
    indMedicion = 0;
  } else;
  if (indMedicion == 1) {
    document.getElementById("medicion").innerHTML = "";
    document.getElementById("medicion").innerHTML = "Parar Medición";
  } else {
    document.getElementById("medicion").innerHTML = "Iniciar Medición";
  }
}

function valorMedicion() {
  const db = firebase.firestore();
  var docRef = db
    .collection("usuario")
    .doc(usuario)
    .collection("configuracion")
    .doc("medidor");
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        medicion(doc.data().medicion);
      } else {
        // No hay documento
        console.log("No hay documento!");
      }
    })
    .catch((error) => {
      //Error obteniendo el documento
      console.log("Error obteniendo el documento:", error);
    });
}

function medicion(indMedicion) {
  //Iniciar Medición
  if (indMedicion == 0) {
    actMedicion(1);
    console.log("Inicia: 1");
    document.getElementById("medicion").innerHTML = "";
    document.getElementById("medicion").innerHTML = "Parar Medición";
    /*Se actualiza el consumo limite del usuario
    en la base de datos en tiempo real*/
    const db = firebase.firestore();
    var docRef = db.collection("usuario").doc(usuario);
    var consumoLim;
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          consumoLim = doc.data().consumoLimite;
          //console.log(consumoLim);
          firebase.database().ref().update({
            limite: consumoLim,
          });
        } else {
          console.log("No hay documento");
        }
      })
      .catch((error) => {
        console.log("Error obteniendo el documento:", error);
      });
    firebase.database().ref().update({
      iniciar: 1,
    });
  }
  //Parar Medición
  else {
    actMedicion(0);
    guardarDia();
    console.log("Para: 0");
    document.getElementById("medicion").innerHTML = "Iniciar Medición";
    firebase.database().ref().update({
      iniciar: 0,
    });
  }
}

function automatico() {
  //localStorage.setItem("indSeleccion", 0);
  /*Actualizar base de datos con la configuración 
  de seleccion de objetivo elegida*/
  actObjetivo(0);
  document.getElementById("manual").style.display = "none";
  document.getElementById("manual").style.visibility = "hidden";

  var op1 = document.getElementById("config1");
  var op2 = document.getElementById("config2");

  op1.style.background = "rgb(116,0,184)";
  op1.style.color = "white";

  op2.style.background = "white";
  op2.style.color = "black";
}

function manual() {
  //localStorage.setItem("indSeleccion", 1);
  /*Actualizar base de datos con la configuración 
  de seleccion de objetivo elegida*/
  actObjetivo(1);
  document.getElementById("manual").style.display = "block";
  document.getElementById("manual").style.visibility = "visible";

  var op1 = document.getElementById("config1");
  var op2 = document.getElementById("config2");

  op1.style.background = "white";
  op1.style.color = "black";

  op2.style.background = "rgb(116,0,184)";
  op2.style.color = "white";
}

function auditiva() {
  //localStorage.setItem("indAlarma", 0);
  actAlarma(0);
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

function visual() {
  //localStorage.setItem("indAlarma", 1);
  actAlarma(1);
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

function ambas() {
  //localStorage.setItem("indAlarma", 2);
  actAlarma(2);
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

/*--Función para establecer las configuraciones guardadas
en la base de datos firestore, se llama solo al iniciar o 
recargar la página--------------------------------------*/
function setConfiguracion() {
  const db = firebase.firestore();
  var docRef = db
    .collection("usuario")
    .doc(usuario)
    .collection("configuracion")
    .doc("medidor");
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        setAlarma(doc.data().alarma);
        setObjetivo(doc.data().objetivo);
        setMedicion(doc.data().medicion);
      } else {
        // No hay documento
        console.log("No hay documento!");
      }
    })
    .catch((error) => {
      //Error obteniendo el documento
      console.log("Error obteniendo el documento:", error);
    });
}

/*--Funciones para actualizar los datos de configuración
en la base de datos firestores-------------------------*/
function actAlarma(alarma) {
  const db = firebase.firestore();
  var docRef = db
    .collection("usuario")
    .doc(usuario)
    .collection("configuracion")
    .doc("medidor");
  if (alarma == undefined) {
  } else {
    return docRef.update({
      alarma: alarma,
    });
  }
}

function actObjetivo(objetivo) {
  const db = firebase.firestore();
  var docRef = db
    .collection("usuario")
    .doc(usuario)
    .collection("configuracion")
    .doc("medidor");
  if (objetivo == undefined) {
  } else {
    return docRef.update({
      objetivo: objetivo,
    });
  }
}

function actMedicion(medicion) {
  const db = firebase.firestore();
  var docRef = db
    .collection("usuario")
    .doc(usuario)
    .collection("configuracion")
    .doc("medidor");
  if (medicion == undefined) {
  } else {
    return docRef.update({
      medicion: medicion,
    });
  }
}

function guardarDia() {
  const db = firebase.firestore();
  var docRef = db.collection("usuario").doc(usuario);
  var fecha = new Date();

  var dia = fecha.getDay();
  if (dia == 1) {
    return docRef
      .update({
        lunes: firebase.firestore.FieldValue.increment(consumo),
      })
      .then(() => {
        console.log("Documento Lunes correctament actualizado");
      })
      .catch((error) => {
        console.error("Error actualizando el documento: ", error);
      });
  } else if (dia == 2) {
    return docRef
      .update({
        martes: firebase.firestore.FieldValue.increment(consumo),
      })
      .then(() => {
        console.log("Documento Martes correctament actualizado");
      })
      .catch((error) => {
        console.error("Error actualizando el documento: ", error);
      });
  } else if (dia == 3) {
    return docRef
      .update({
        miercoles: firebase.firestore.FieldValue.increment(consumo),
      })
      .then(() => {
        console.log("Documento Miercoles correctament actualizado");
      })
      .catch((error) => {
        console.error("Error actualizando el documento: ", error);
      });
  } else if (dia == 4) {
    return docRef
      .update({
        jueves: firebase.firestore.FieldValue.increment(consumo),
      })
      .then(() => {
        console.log("Documento Jueves correctament actualizado");
      })
      .catch((error) => {
        console.error("Error actualizando el documento: ", error);
      });
  } else if (dia == 5) {
    return docRef
      .update({
        viernes: firebase.firestore.FieldValue.increment(consumo),
      })
      .then(() => {
        console.log("Documento Viernes correctament actualizado");
      })
      .catch((error) => {
        console.error("Error actualizando el documento: ", error);
      });
  } else if (dia == 6) {
    return docRef
      .update({
        sabado: firebase.firestore.FieldValue.increment(consumo),
      })
      .then(() => {
        console.log("Documento Sabado correctament actualizado");
      })
      .catch((error) => {
        console.error("Error actualizando el documento: ", error);
      });
  } else if (dia == 0) {
    return docRef
      .update({
        domingo: firebase.firestore.FieldValue.increment(consumo),
      })
      .then(() => {
        console.log("Documento Domingo correctament actualizado");
      })
      .catch((error) => {
        console.error("Error actualizando el documento: ", error);
      });
  } else;
}

/*-------- Escucha --------------*/
function escucha(usuario){
const db = firebase.firestore();
var docRef = db
  .collection("usuario")
  .doc(usuario)
  .collection("configuracion")
  .doc("medidor");

docRef.onSnapshot((doc) => {
        //console.log("Current data: ", doc.data());
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source);
        //Si la actualización viene del servidor
        //cambia el botón de medición
        if(source == "Server"){
          setMedicion(doc.data().medicion);
        }
        else;
    });
}
