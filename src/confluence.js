const axios = require('axios');

// Docs
// https://docs.atlassian.com/ConfluenceServer/rest/7.12.1/
// https://docs.atlassian.com/ConfluenceServer/rest/6.15.8/

// var config = {
//   username: "luisgago@example.com",
//   password: "NAHf2w7mIVahI4BOIrWy1F55",
//   baseUrl:  "https://luisgagocasas.atlassian.net/wiki",
//   path:     "/rest/api",
//   space:    "EV"
// };

var config = {
  username: "luisgago",
  password: "sunway",
  baseUrl:  "http://confluence.everis.local",
  path:     "/rest/api",
  space:    "luis"
};

async function getFilter(req) {
  var content = '',
      title   = req.query.title ? req.query.title : null;
      id      = req.query.id ? req.query.id : null;

  if (title != null) {
    var query = `?spaceKey=${config.space}&title=${title}&expand=body.storage,version`;
  } else if (id != null) {
    var query = id + '?expand=body.storage,version';
  }

  await axios.get(config.baseUrl + config.path + '/content/' + query, {
    headers: {
      "Authorization": "Basic " + Buffer.from(config.username + ":" + config.password).toString('base64')
    }
  })
  .then((res) => {
    if (title != null) {
      content = res.data.results[0] ? res.data.results[0].body.storage.value : 'Sin resultado';
    } else if (id != null) {
      content = res.data ? res.data.body.storage.value : 'Sin resultados';
    }
  })
  .catch((error) => {
    content = 'Sin resultados' + error
  })

  respuesta = {
    codigo: 200,
    mensaje: title != '' ? content : 'Sin resultados'
  };

  return respuesta;
}

async function create(req) {
  var title   = req.query.title ? req.query.title : null;
      content = req.query.content ? req.query.content : null;

  var jsondata = {
        "type": "page",
        "title": title,
        "space": {
          "key": config.space
        },
        "body": {
          "storage": {
            "value": content,
            "representation": "storage"
          },
        }
      };

  await axios({
    method: 'post',
    url: config.baseUrl + config.path + '/content/',
    headers: {
      "Authorization": "Basic " + Buffer.from(config.username + ":" + config.password).toString('base64')
    },
    data: jsondata
  })
  .then((res) => {
    content = res.data.id;
  })
  .catch((error) => {
    content = 'Se presento problemas'
  })

  respuesta = {
    codigo: 200,
    mensaje: content
  };

  return respuesta;
}

async function remove(req) {
  var id   = req.params.id ? req.params.id : null;

  var query = id;

  await axios({
    method: 'delete',
    url: config.baseUrl + config.path + '/content/' + query,
    headers: {
      "Authorization": "Basic " + Buffer.from(config.username + ":" + config.password).toString('base64')
    }
  })
  .then((res) => {
    content = res.status == 204 ? 'Se elimino' : 'Se produjo un error';
  })
  .catch((error) => {
    content = 'Se presento problemas'
  })

  respuesta = {
    codigo: 200,
    mensaje: content
  };

  return respuesta;
}

exports = module.exports = {
  getFilter,
  create,
  remove
}