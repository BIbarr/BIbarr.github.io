/*-------------- Autenticación --------------------*/
var usuario = "";
//Método para revisar el estado de sesión del usuario
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario en sesión
    document.getElementById("name").innerHTML = user.displayName;
    console.log(user.displayName);
    //console.log(user.uid);
    console.log("Auth: En Sesión");
    usuario = user.uid;
  } else {
    // No hay usuario en sesión
    console.log("Auth: No en Sesión");
  }
});

/*------------------ Firestore --------------------------*/
function conseguirConsumoDia() {
  var consumoDia;
  var fecha = new Date();
  //Variable de referencia del documento
  const db = firebase.firestore();
  var docRef = db.collection("usuario").doc(usuario);

  return new Promise((resolve) => {
    //Método para obtener un documento de la colección usuario
    //Recuperar el dato de consumo en el dia actual
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          //console.log("Document data:", doc.data());
          switch (fecha.getDay()) {
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
          //console.log(consumoDia);
          console.log("Consumo en el Historial: " + consumoDia);
          resolve(consumoDia);
        } else {
          // No hay documento
          console.log("No hay documento!");
        }
      })
      .catch((error) => {
        //Error obteniendo el documento
        console.log("Error obteniendo el documento:", error);
      });
  });
}

function conseguirConsumoLim() {
  var consumoLim;
  //Variable de referencia del documento
  const db = firebase.firestore();
  var docRef = db.collection("usuario").doc(usuario);
  return new Promise((resolve) => {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          consumoLim = doc.data().consumoLimite;
          document.getElementById("consumo_2").innerHTML = consumoLim + " Lts.";
          console.log("Consumo Límite: " + consumoLim);
          resolve(consumoLim);
        } else {
          // No hay documento
          console.log("No hay documento!");
        }
      })
      .catch((error) => {
        //Error obteniendo el documento
        console.log("Error obteniendo el documento:", error);
      });
  });
}

/*------------------ Database ----------------------------*/
//Variable de referencia a la base de datos en tiempo real
var medicionRef = firebase.database().ref("medicion_vol/");
//Método de observación de la base de datos en tiempo real
medicionRef.on("value", (snapshot) => {
  console.log("Valor Medido: " + snapshot.val());
  conseguirConsumoDia()
    .then((consumoDia) => {
      //consumo = consumoDia + snapshot.val();
      consumo = snapshot.val();
      document.getElementById("consumo").innerHTML =
        Number.parseFloat(consumo).toFixed(2) + " Lts.";
    })
    .catch((error) => {
      console.log(error);
    });

  conseguirConsumoLim()
    .then((consumoLim) => {
      mensajeProgreso(consumo, consumoLim);
    })
    .catch((error) => {
      console.log(error);
    });
});

/*-------------- Mensaje de Consumo -----------------------*/
function mensajeProgreso(consumo, consumoLim) {
  if (consumo <= 0.5 * consumoLim) {
    document.getElementById("progreso").innerHTML =
      "Vas excelente mantente así...";
  } else if (consumo > 0.5 * consumoLim && consumo <= 0.8 * consumoLim) {
    document.getElementById("progreso").innerHTML = "No consumas tanto...";
  } else if (consumo > 0.8 * consumoLim && consumo <= consumoLim) {
    document.getElementById("progreso").innerHTML =
      "Cuidado casi llegas al límite...";
  } else if (consumo > consumoLim) {
    document.getElementById("progreso").innerHTML = "¡Cuida el agua!";
  } else {
    document.getElementById("progreso").innerHTML = "";
  }
}
