/*-------------- Autenticación --------------------*/
var usuario = "";
//Método para revisar el estado de sesión del usuario
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario en sesión
    document.getElementById("name").innerHTML = user.displayName;
    console.log(user.displayName);
    usuario = user.uid;
    conseguirDatos();
    console.log("Auth: En Sesión");
  } else {
    // No hay usuario en sesión
    console.log("Auth: No en Sesión");
  }
});

var consumo;
var consumoLim;

/*------------------ Firestore --------------------------*/
function conseguirDatos(){
const db = firebase.firestore();
//Variable de referencia del documento
var docRef = db.collection("usuario").doc(usuario);
//Método para obtener un documento de la colección consumo
docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      consumoLim = doc.data().consumoLimite;
      console.log("Límite de Consumo: " + consumoLim);
      document.getElementById("consumo_2").innerHTML = consumoLim + " Lts.";
    } else {
      // No hay documento
      console.log("No such document!");
    }
  })
  .catch((error) => {
    //Error obteniendo el documento
    console.log("Error getting document:", error);
  });
}

/*------------------ Database ----------------------------*/
//Variable de referencia a la base de datos
var medicionRef = firebase.database().ref("medicion_vol/");
//Método de observación de la base de datos 
medicionRef.on("value", (snapshot) => {
  consumo = snapshot.val();
  console.log("Consumo: " + consumo)
  document.getElementById("consumo").innerHTML = consumo + " Lts.";
  if(consumoLim == undefined){}
  else{ progreso(consumo,consumoLim);}
});

/*-------------- Mensaje de Consumo -----------------------*/
function progreso(consumo,consumoLim){
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
    document.getElementById("progreso").innerHTML = "¡Cuida el agua puto!";
  }
  else{
    document.getElementById("progreso").innerHTML = "";
  }
}


