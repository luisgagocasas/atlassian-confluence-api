const express = require("express")
      app = express()
      bodyParser = require('body-parser')
      confluence = require('./src/confluence');
      jira = require('./src/jira');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function init() {
  let respuesta = {
    codigo: 200,
    mensaje: ''
  };
  
  app.get('/', function(req, res) {
    respuesta = {
      codigo: 200,
      mensaje: 'Inicio'
    };

    res.send(respuesta);
  });

  // Confluence

  app.get('/confluence/filter', async function(req, res) {
    var content = await confluence.getFilter(req);

    res.send(content);
  });

  app.get('/confluence/create', async function(req, res) {
    var content = await confluence.create(req);

    res.send(content);
  });

  app.get('/confluence/delete/:id', async function(req, res) {
    var content = await confluence.remove(req);

    res.send(content);
  });

  // Jira
  app.get('/jira/id', async function(req, res) {
    var content = await jira.getTask(req);

    res.send(content);
  });

  app.get('/jira/create', async function(req, res) {
    var content = await jira.create(req);

    res.send(content);
  });

  app.get('/jira/remove', async function(req, res) {
    var content = await jira.remove(req);

    res.send(content);
  });

  app.use(function(req, res, next) {
    respuesta = {
      codigo: 404,
      mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
  });

  app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
  });
};

exports = module.exports = {
  init
}