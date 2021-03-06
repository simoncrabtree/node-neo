var request = require('request');
var oboe = require('oboe');

module.exports = function (cypher, params, callback) {
  var results = [];
  var requestQuery = request.post({
    headers: {
      'Accept': 'application/json',
      'X-Stream': 'true'
    },
    url: 'http://localhost:7474/db/data/cypher',
    json: {
      query: cypher,
      params: params
    }
  });

  oboe(requestQuery)
  .node('data[*]*', function (data) {
    results.push(data);
  })
  .fail(function (error) {
  	console.log("node-neo failed", error);
  	callback(error);
  })
  .done(function (data) {
    callback(null, results);
  });
};
