const signInForm = document.querySelector("#signin-form");

//Método de escucha para inicio de sesión
signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector('#signin-usuario').value;
    const password = document.querySelector('#signin-contrasena').value;
    //Método de autenticación con email y contraseña
    firebase.auth()
        .signInWithEmailAndPassword(email,password)
        .then((userCredential)=>{
            console.log('Sign In');
            signInForm.reset();
            window.location.replace('/html/home.html');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);

          if(errorCode == "auth/user-not-found"){
            document.getElementById("mensaje1").innerHTML = "Este correo no está registrado";
            document.getElementById("mensaje2").innerHTML = "";
          }
          else if(errorCode == "auth/wrong-password"){
            document.getElementById("mensaje1").innerHTML = "";
            document.getElementById("mensaje2").innerHTML = "La contraseña es incorrecta";
          }
      })
});

//Método de verificación de sesión de usuario 
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Usuario en sesión 
      console.log(user);
      console.log(user.displayName);
      console.log('Auth: En sesión');
      window.location.replace('/html/home.html');
    } else {
      // Sesión de usuario terminada
      console.log('Auth: No en sesión');
    }
  });