import fetch from 'node-fetch';

function getQueryString(params) {
    var esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  }

  function request(params) {
    var method = params.method || 'GET';
    var qs = '';
    var body;
    var headers = params.headers || {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (['GET', 'DELETE'].indexOf(method) > -1)
      qs = '?' + getQueryString(params.data);
    else // POST or PUT
      body = JSON.stringify(params.data);

    var url = params.url + qs;
    
    return fetch(url, { method, headers, body })
      .then(res => res.json())
      .then(response => response)
      .catch(error => console.error('Error:', error));
  }

  export default {
    get: params => request(Object.assign({ method: 'GET' }, params)),
    post: params => request(Object.assign({ method: 'POST' }, params)),
    put: params => request(Object.assign({ method: 'PUT' }, params)),
    delete: params => request(Object.assign({ method: 'DELETE' }, params))
  };
