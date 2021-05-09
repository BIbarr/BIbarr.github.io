const signUpForm = document.querySelector("#signup-form");

//Método que escucha si se llenó el registro
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector('#display-name').value;
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-contrasena').value;

    console.log(name);
    firebase.auth()
        .createUserWithEmailAndPassword(email,password)
        .then((userCredential)=>{
            var user = firebase.auth().currentUser;
            user.updateProfile({displayName: name});
            signUpForm.reset();
            window.location.replace('/index.html');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            if(errorCode == "auth/email-already-in-use"){
            document.getElementById("mensaje").innerHTML = "El correo ya ha sido utilizado";
            }
        })
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Usuario en sesión
      console.log(user.displayName);
      console.log("Auth: En Sesión");
      /*--------Creación del documento para el usuario---------*/
      var usuario = user.uid; //var uid = user.uid;
      console.log(usuario);
      const db = firebase.firestore();
      db.collection("usuario").doc(usuario).set({
          consumoLimite: 0,
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0
      })
      .then(() => {
          console.log("Documento escrito correctamente!");
      })
      .catch((error) => {
          console.error("Error escribiendo el documento: ", error);
      });
      /*-------------------------------------------------------*/
    } else {
      // No hay usuario en sesión
      console.log("Auth: No en Sesión");
    }
});
  




