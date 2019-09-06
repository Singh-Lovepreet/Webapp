var request = require('request');
var deferred = require('../common-utils/deferred');
var fn = require('../common-utils/functions');

function HttpClient() {
}

HttpClient.prototype.main = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  return fn.defer(function (callbacks) {
    function callback(err, resObject, result) {
      if (err || resObject.statusCode > 400) {
        callbacks(err, result);
      } else {
        callbacks(err, result);
      }
    }

    args.push(callback);
    request.apply(null, args);
  }, null)();
};

HttpClient.prototype.getJSON = function (url, xtraOptions) {
  var options = {
    url: url,
    method: 'GET',
    headers: {
      "Content-type": "application/json"
    }
  };
  options = fn.merge(options, xtraOptions);
  return this.main(options);
};

HttpClient.prototype.getPlainText = function (url) {
  var options = {
    url: url,
    method: 'GET',
    headers: {
      "Content-type": "text/plain"
    }
  };
  return this.main(options);
};

HttpClient.prototype.postJSON = function (url, params, xtraOptions = {}) {
  var options = {
    url: url,
    method: "POST",
    json: params
  };

  if (params.cookieString) {
    const cookie = request.cookie(params.cookieString);
    const j = request.jar();
    j.setCookie(cookie, url);
    options.jar = j;
  }
  // console.logger.info('sending request with options: ', options);
  options = fn.merge(options, xtraOptions);
  return this.main(options);
};

HttpClient.prototype.raw = function (options) {
  return this.main(options);
};

HttpClient.prototype.postForm = function (url, form, xtraOptions) {
  var options = {
    url: url,
    method: 'POST',
    form: form
  };
  options = fn.merge(options, xtraOptions);
  return this.main(options);
};

exports.HttpClient = HttpClient;
exports.getInstance = function () {
  return new HttpClient();
};
