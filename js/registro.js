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

            if(errorCode = "auth/email-already-in-use"){
            document.getElementById("mensaje").innerHTML = "El correo ya ha sido utilizado";
            }
        })
});




