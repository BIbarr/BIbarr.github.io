//Método para revisar el estado de sesión del usuario
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario en sesión
    document.getElementById("name").innerHTML = user.displayName;
    console.log(user.displayName);
    console.log("auth: sign in");
  } else {
    // No hay usuario en sesión
    console.log("auth: no sign in");
  }
});

const db = firebase.firestore();
//Variable de referencia del documento
var docRef = db.collection("consumo").doc("EsZDmrs1WLImvOX7CQ5t");

//Método para obtener un documento de la colección consumo
docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      consumo = doc.data().con;
      console.log(consumo);
      document.getElementById("consumo").innerHTML = consumo + " Lts.";
    } else {
      // No hay documento
      console.log("No such document!");
    }
  })
  .catch((error) => {
    //Error obteniendo el documento
    console.log("Error getting document:", error);
  });
