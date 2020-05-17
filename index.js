// Requerimos los modulos que vamos a utilizar
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');


// Creamos el servidor
const server = express();

//--------- Settings ---------
server.set('appName', 'Romero Express');
server.set('port', 3000);
server.set('view engine', 'ejs');


/* Middleware - Es un manejador de peticiones antes de que lleguen a las rutas

function logger(req, res, next) {
    console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}*/

server.use(express.json());                 // Agregar comando para que express entienda los objetos json
//server.use(logger);                          Middleware
server.use(morgan('dev'));                  // Middleware de rutas


//--------- Routes ---------

/* Direccionamos la busqueda a lo que querramos mostrar
server.all('/user', (req, res, next) => {
    console.log('Por aqui paso');
    next();
});*/


//--------- Metodo GET ---------
server.get('/', (req, res) => {
    //res.send('Home - Peticion GET Recibida');
    const data = [{ name: 'john' }, { name: 'joe' }, { name: 'cameron' }, { name: 'ryan' }]
    res.render('index.ejs', { people: data });
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
    console.log(req.params);
    res.send(`User ${req.params.id} actualizado`);
});


//--------- Metodo DELETE ---------
server.delete('/test', (req, res) => {
    res.send('Test - Peticion DELETE recibida');
});

server.delete('/user/:id', (req, res) => {
    res.send(`User ${req.params.id} eliminado`);
});


//--------- Middleware ---------
server.use(express.static('src'));

// Escuchamos en el puerto 3000
server.listen(server.get('port'), () => {
    console.log(server.get('appName'));
    console.log("Server on Port ", server.get('port'));
});