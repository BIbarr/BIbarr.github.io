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
        });
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