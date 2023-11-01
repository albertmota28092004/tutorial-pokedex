
var usernames = [];
var passwords = [];
var emails = [];

function registerUser(){
    event.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('pwd').value;

    usernames.push(username);
    passwords.push(password);
    emails.push(email);

    mostrarAlerta("User registered successfully")

    window.open("indexAdmin.html")
}

function validateUser() {

}

function mostrarAlerta(mensaje) {
    var alerta = document.createElement('div');
    alerta.classList.add('mi-alerta');
    alerta.textContent = mensaje;
  
    document.body.appendChild(alerta);
  
    setTimeout(function() {
      alerta.remove();
    }, 3000);
  }