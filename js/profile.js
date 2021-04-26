//Variables
var i = 0;
var j = 0;
var mayor = 0;
var litros = [0, 0, 0, 0, 0];
var valores = ["0%", "0%", "0%", "0%", "0%"];

//Método para revisar el estado de sesión del usuario
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario en sesión
    console.log(user.displayName);
    console.log("Auth: En Sesión");
  } else {
    // No hay usuario en sesión
    console.log("Auth: No en Sesión");
  }
});

const db = firebase.firestore();
var consumoSemanal = db.collection("consumo-semanal");

//Método para agregar un documento a la colección consumo-semanal
/*consumoSemanal
  .add({ litros: [10, 2, 40, 30, 50] })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });*/

//Variable de referencia del documento para la colección consumo-semanal
var docRef = db.collection("consumo-semanal").doc("wgi4VKnZn9XTSWQb2K7e");

//Método para obtener los datos del documento en la colección consumo-semanal
docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      litros = doc.data().litros;
      mostrar_litros();
      console.log(litros);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

//Función para mostrar los datos de consumo en la semana
function mostrar_litros() {
  if (
    litros[0] >= litros[1] &&
    litros[0] >= litros[2] &&
    litros[0] >= litros[3] &&
    litros[0] >= litros[4]
  ) {
    mayor = litros[0];
  } else if (
    litros[1] >= litros[0] &&
    litros[1] >= litros[2] &&
    litros[1] >= litros[3] &&
    litros[1] >= litros[4]
  ) {
    mayor = litros[1];
  } else if (
    litros[2] >= litros[0] &&
    litros[2] >= litros[1] &&
    litros[2] >= litros[3] &&
    litros[2] >= litros[4]
  ) {
    mayor = litros[2];
  } else if (
    litros[3] >= litros[0] &&
    litros[3] >= litros[1] &&
    litros[3] >= litros[2] &&
    litros[3] >= litros[4]
  ) {
    mayor = litros[3];
  } else {
    mayor = litros[4];
  }

  console.log(mayor);

  for (i = 0; i < 5; i++) {
    valores[i] = (litros[i] * 100) / mayor + "%";
  }

  for (i = 0; i < 5; i++) {
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
}

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
