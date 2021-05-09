/*-------------- Autenticación --------------------*/
var usuario = "";
//Método para revisar el estado de sesión del usuario
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario en sesión
    console.log(user.displayName);
    usuario = user.uid;
    console.log("Auth: En Sesión");
    obtenerDatos();
  } else {
    // No hay usuario en sesión
    console.log("Auth: No en Sesión");
  }
});

/*---------- Mostrar datos de la semana-----------*/
//Variables
var i = 0;
var j = 0;
var mayor = 0;
var litros = [0, 0, 0, 0, 0, 0, 0];
var valores = ["0%", "0%", "0%", "0%", "0%", "0%", "0%"];

//Función para obtener datos de firestore
function obtenerDatos() {
  //Variable de referencia del documento para la colección consumo-semanal
  const db = firebase.firestore();
  var docRef = db.collection("usuario").doc(usuario);

  //Método para obtener los datos del documento en la colección consumo-semanal
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        //console.log("Datos: ", doc.data());
        litros[0] = doc.data().lunes;
        litros[1] = doc.data().martes;
        litros[2] = doc.data().miercoles;
        litros[3] = doc.data().jueves;
        litros[4] = doc.data().viernes;
        litros[5] = doc.data().sabado;
        litros[6] = doc.data().domingo;
        mostrar_litros();
        console.log(litros);
      } else {
        //doc.data() no está definido
        console.log("No se encuentra el documento!");
      }
    })
    .catch((error) => {
      console.log("Error obteniendo el documento:", error);
    });
}

//Función para mostrar los datos de consumo en la semana
function mostrar_litros() {
  if (
    litros[0] >= litros[1] &&
    litros[0] >= litros[2] &&
    litros[0] >= litros[3] &&
    litros[0] >= litros[4] &&
    litros[0] >= litros[5] &&
    litros[0] >= litros[6]
  ) {
    mayor = litros[0];
  } else if (
    litros[1] >= litros[0] &&
    litros[1] >= litros[2] &&
    litros[1] >= litros[4] &&
    litros[1] >= litros[5] &&
    litros[1] >= litros[6]
  ) {
    mayor = litros[1];
  } else if (
    litros[2] >= litros[0] &&
    litros[2] >= litros[1] &&
    litros[2] >= litros[3] &&
    litros[2] >= litros[4] &&
    litros[2] >= litros[5] &&
    litros[2] >= litros[6]
  ) {
    mayor = litros[2];
  } else if (
    litros[3] >= litros[0] &&
    litros[3] >= litros[1] &&
    litros[3] >= litros[2] &&
    litros[3] >= litros[4] &&
    litros[3] >= litros[5] &&
    litros[3] >= litros[6]
  ) {
    mayor = litros[3];
  } else if (
    litros[4] >= litros[0] &&
    litros[4] >= litros[1] &&
    litros[4] >= litros[2] &&
    litros[4] >= litros[4] &&
    litros[4] >= litros[5] &&
    litros[4] >= litros[6]
  ) {
    mayor = litros[4];
  } else if (
    litros[5] >= litros[0] &&
    litros[5] >= litros[1] &&
    litros[5] >= litros[2] &&
    litros[5] >= litros[4] &&
    litros[5] >= litros[5] &&
    litros[5] >= litros[6]
  ) {
    mayor = litros[5];
  } 
  else {
    mayor = litros[6];
  }

  console.log(mayor);

  for (i = 0; i < 7; i++) {
    valores[i] = (litros[i] * 100) / mayor + "%";
  }

  for (i = 0; i < 7; i++) {
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

  var sabado = document.getElementById("sabado");
  sabado.style.width = valores[5];

  var domingo = document.getElementById("domingo");
  domingo.style.width = valores[6];
}


/*------------- Cierre de Sesión --------------*/
const cerrarSesion = document.querySelector("#cerrar-sesion");

//Método para cierre de sesión
cerrarSesion.addEventListener("click", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sesión Finalizada");
      window.location.replace("/index.html");
    });
});
