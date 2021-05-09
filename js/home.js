/*-------------- Autenticación --------------------*/
var usuario = "";
//Método para revisar el estado de sesión del usuario
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario en sesión
    document.getElementById("name").innerHTML = user.displayName;
    console.log(user.displayName);
    console.log("Auth: En Sesión");
    usuario = user.uid;
    conseguirDatos();
  } else {
    // No hay usuario en sesión
    console.log("Auth: No en Sesión");
  }
});

var consumo;
var consumoDia;
var consumoLim;

/*------------------ Firestore --------------------------*/
function conseguirDatos(){
var fecha = new Date();
//Variable de referencia del documento
const db = firebase.firestore();
var docRef = db.collection("usuario").doc(usuario);
//Método para obtener un documento de la colección usuario
//Recuperar el dato de consumo en el dia actual 
docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      switch (fecha.getDay()){
        case 0:
          consumoDia = doc.data().domingo;
          break;
        case 1:
          consumoDia = doc.data().lunes;
          break;
        case 2:
          consumoDia = doc.data().martes;
          break;
        case 3:
          consumoDia = doc.data().miercoles;
          break;
        case 4: 
          consumoDia = doc.data().jueves;
          break;
        case 5: 
          consumoDia = doc.data().viernes;
          break;
        case 6:
          consumoDia = doc.data().sabado;
          break;
      }
      console.log("Consumo 1: " + consumoDia);
      consumoLim = doc.data().consumoLimite;
      console.log("Límite de Consumo: " + consumoLim);
      document.getElementById("consumo_2").innerHTML = consumoLim + " Lts.";
      datosConsumo();
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


/*------------------ Database ----------------------------*/
function datosConsumo(){
//Variable de referencia a la base de datos
var medicionRef = firebase.database().ref("medicion_vol/");
//Método de observación de la base de datos 
medicionRef.on("value", (snapshot) => {
  console.log("Obteniendo Datos");
  consumo = consumoDia + snapshot.val();
  console.log("Consumo 2: " + consumo);
  document.getElementById("consumo").innerHTML = Number.parseFloat(consumo).toFixed(2) + " Lts."; 
  if(consumoLim == undefined){}
  else{ mensajeProgreso(consumo,consumoLim);}
});
}

/*-------------- Mensaje de Consumo -----------------------*/
function mensajeProgreso(consumo,consumoLim){
  console.log("Entro a la función progreso");
  console.log(consumo);
  console.log(consumoLim);
  if(consumo <= (0.5*consumoLim)){
    document.getElementById("progreso").innerHTML = "Vas excelente mantente así...";
  }
  else if(consumo > (0.5*consumoLim) && consumo <= (0.8*consumoLim)){
    document.getElementById("progreso").innerHTML = "No consumas tanto...";
  }
  else if(consumo > (0.8*consumoLim) && consumo <= (consumoLim)){
    document.getElementById("progreso").innerHTML = "Cuidado casi llegas al límite...";
  }
  else if(consumo > consumoLim){
    document.getElementById("progreso").innerHTML = "¡Cuida el agua!";
  }
  else{
    document.getElementById("progreso").innerHTML = "";
  }
}


