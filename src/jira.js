const axios = require('axios');

// Docs
// https://developer.atlassian.com/server/jira/platform/rest-apis/

var config = {
  username: "luisgago",
  password: "sunway",
  baseUrl:  "http://jira.everis.local",
  path:     "/rest/api/2",
  key:      "TEST"
};

async function getTask(req) {
  var content = '',
      id  = 0,
      idtask  = req.query.id ? req.query.id : null;

  if (idtask != null) {
    await axios.get(config.baseUrl + config.path + '/issue/' + idtask, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(config.username + ":" + config.password).toString('base64')
      }
    })
    .then((res) => {
      respt = res.data.fields

      content = respt.description;
      id      = respt.issuetype.id;
    })
    .catch((error) => {
      content = 'Sin resultados' + error;
      id      = 0;
    })
  } else {
    mensaje = "Added id task!";
    id      = 0;
  }

  respuesta = {
    codigo: 200,
    mensaje: content,
    idtask: id
  };

  return respuesta;
}

async function create(req) {
  // var title   = req.query.title ? req.query.title : null;
  //     content = req.query.content ? req.query.content : null;

  var jsondata = {
        "fields": {
          "project": {
            "key": config.key
          },
          "summary": "Resumen 1",
          "description": "Descripcion 1",
          "issuetype": {
            "name": "Bug"
          }
        }
      };

  await axios({
    method: 'post',
    url: config.baseUrl + config.path + '/issue/',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + Buffer.from(config.username + ":" + config.password).toString('base64')
    },
    data: jsondata
  })
  .then((res) => {
    console.log('res:', res)
    content = 'a';
    //content = res.data.id;
  })
  .catch((error) => {
    console.log('error:', error)
    content = error
    //content = 'Se presento problemas'
  })

  respuesta = {
    codigo: 200,
    mensaje: content
  };

  return respuesta;
}

async function remove(req) {
  var content = '',
      idtask  = req.query.id ? req.query.id : null;

  if (idtask != null) {
    await axios.delete(config.baseUrl + config.path + '/issue/' + idtask, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(config.username + ":" + config.password).toString('base64')
      }
    })
    .then((res) => {
      content = res.status == 204 ? 'remove' + idtask : 'not remove';
    })
    .catch((error) => {
      content = error;
    })
  } else {
    mensaje = "Added id task!";
  }

  respuesta = {
    codigo: 200,
    mensaje: content
  };

  return respuesta;
}

exports = module.exports = {
  getTask,
  create,
  remove
}