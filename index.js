// Requerimos los modulos que vamos a utilizar
const express = require('express');
const colors = require('colors');

// Creamos el servidor
const server = express();

// Middleware - Es un manejador de peticiones antes de que lleguen a las rutas
function logger(req, res, next){
    console.log("Request Recived");
    next();
}

// Agregar comando para que express entienda los objetos json
server.use(express.json());
server.use(logger());

// Direccionamos la busqueda a lo que querramos mostrar

server.all('/user', (req, res, next)=>{
    console.log('Por aqui paso');
    next();
});


//--------- Metodo GET ---------
server.get('/', (req, res) => {
    res.send('Home - Peticion GET Recibida');
});

server.get('/user', (req, res) => {
    res.json({
        name: 'Jose',
        last: 'Romero'
    });
});


//--------- Metodo POST ---------
server.post('/about', (req, res) => {
    res.send('About me - Peticion POST Recibida');
});

server.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send('About me - Peticion POST Recibida');
});


//--------- Metodo PUT ---------
server.put('/contact', (req, res) => {
    res.send('Contact - Peticion PUT Recibida');
});

server.put('/user/:id', (req, res) => {
    console.log(req.body);
    res.send(`User ${req.params.id} actualizado`);
});


//--------- Metodo DELETE ---------
server.delete('/test', (req, res) => {
    res.send('Test - Peticion DELETE recibida');
});

server.delete('/user/:id', (req, res) => {
    res.send(`User ${req.params.id} eliminado`);
});


// Escuchamos en el puerto 3000
server.listen(5000, () => {
    console.log("Server on Port 5000".cyan);
});