const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const bcrypt = require('bcrypt');

const uri = "mongodb+srv://albertmota28:5Y6Nhirv9eeQ7jlZ@clusteradso2557466.htke3tm.mongodb.net/users"

mongoose.connect(uri, function(err) {
  if (err) {
    throw err
  } else {
    console.log(`Successfully connected to ${uri}`)
  }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {

})

app.listen(3000, () => {
  console.log('Server started')
})

module.exports = app;


/*

        document.getElementById('register').addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('pwd').value;

            // Realizar la solicitud POST al servidor Node.js
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            })
                .then(response => response.text())
                .then(data => {
                    alert(data); // Muestra la respuesta del servidor
                })
                .catch(error => {
                    console.error(error);
                    alert('Error en el registro.');
                });
        }); 
*/