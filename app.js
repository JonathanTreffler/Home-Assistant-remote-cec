const http = require('http');
const url = require('url');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const hostname = '0.0.0.0';
const port = 8080;

const cecDeviceId = 0;

const server = http.createServer((req, res) => {
  let urlParts = url.parse(req.url);
  let route = urlParts.pathname;

  if(route == "/shutdown") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    exec("echo 'standby " + cecDeviceId + "' | cec-client -s -d 1").then(function() {
      res.write("success");
      res.end('');
    });
  } else if(route == "/poweron") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    exec("echo 'on " + cecDeviceId + "' | cec-client -s -d 1").then(function() {
      res.write("success");
      res.end('');
    });
  } else {
    res.statusCode = 400;
    res.end('');
  }

  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
