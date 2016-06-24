// Import HTTP node.js module
var http = require('http');

// Import other useful modules
var fs = require('fs');
var url = require('url');
var path = require('path');


// Set the default post
const DEF_PORT = 8080;
// Set default server address
const ADDRESS = '127.0.0.1';


// Server name. You CANNOT change the name for copyright-law reason!
const SERVER_NAME = 'pHOServer - By Pierre-Henry Soria';

var port = process.argv[2] || DEF_PORT;

var server = http.createServer(function(request, response) {
    // Get the full path requested
    var pathname = url.parse(request.url).pathname;
    pathname = pathname.substr(1);
/*
    if (fs.statSync(pathname).isDirectory() && !fs.readFile(pathname.substr(1))) {
        pathname += '/index.html';
    }
*/

    if (pathname === '/') {
          pathname += '/index.html';
    }

    console.log("Request for " + pathname);

    fs.readFile(pathname, function (error, data) {

        if (error) {
            console.log(error);

            // HTTP Status: 404 : NOT FOUND
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.write("404 - Page Not Found!\r\n");
        } else {
             // Set the content type
            var ext = path.extname(pathname);

            switch (ext) {
                case '.gif':
                     contentType = 'image/gif';
                      break;
                case '.jpg':
                    contentType = 'image/jpeg';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                default:
                    contentType = 'text/html';
            }

            // HTTP Status: 200 : OK
            response.writeHead(200, {'Content-Type': contentType, 'X-Powered-By': SERVER_NAME, 'Server': SERVER_NAME});


            // Write the content of the file to response body
            response.write(data.toString());

            // If binary file
            if (contentType != 'text/html') {
              file = fs.readFileSync(pathname);
              response.end(file, 'binary');
            } else {
              // Send the response body
              response.end();
            }
        }
    });
});

server.listen(port, ADDRESS);
console.log("Awesome! pHOServer is running on: %s", ADDRESS + ':' + port);
