var exports = module.exports = {};

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10
};


var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  headers['Content-Type'] = 'application/json';
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

exports.sendResponse = sendResponse;