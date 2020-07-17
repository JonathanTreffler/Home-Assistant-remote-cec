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
    console.log("command recieved: shutdown");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    exec("echo 'standby " + cecDeviceId + "' | cec-client -s -d 1")
    .then(function() {
      console.log("command success: shutdown");
      res.write("success");
      res.end('');
    })
    .catch(function() {
      console.log("command failed: shutdown");
    });
  } else if(route == "/poweron") {
    console.log("command recieved: poweron");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    exec("echo 'on " + cecDeviceId + "' | cec-client -s -d 1")
    .then(function() {
      console.log("command success: poweron");
      res.write("success");
      res.end('');
    })
    .catch(function() {
      console.log("command failed: poweron");
    });
  } else if(route == "/scan") {
    exec("echo 'scan' | cec-client -d 1", (error, stdout, stderr) => {
      res.write(stdout? stdout : stderr);
      res.end('');
    });
  } else {
    console.log("recieved unknown command");
    res.statusCode = 400;
    res.end('');
  }

  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
