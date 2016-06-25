/*
 * Description:   Simple and lite Dev HTTP server made with Node.js that doesn't require any configuration.
                  Ideal to test or show (make a demonstration) of a static Web project.

 * Author:        Pierre-Henry Soria <phs@hizup.net>
 * Copyright:     (c) 2016, Pierre-Henry Soria. All Rights Reserved.
 * License:       MIT License <http://opensource.org/licenses/mit-license.php>
 * URL:           https://github.com/pH-7
 */
'use strict';

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
    var pathname = '.' + request.url;

    if (pathname === './') {
          pathname = './index.html';
    }

    console.log("Request for " + pathname);

    fs.readFile(pathname, function (error, data) {
        if (error) {
            console.log(error);

            if (error.code == 'ENOENT') {
                // HTTP Status: 404 : NOT FOUND
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write("404 - Page Not Found!\r\n");
            } else {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.write('Sorry, check with the site admin for error: ' + error.code + "\r\n");
            }
        } else {
            var ext = path.extname(pathname);
            var contentType;

            // Set the correct content type
            switch (ext) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.jpg' || '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.gif':
                     contentType = 'image/gif';
                      break;
                case '.wav':
                    contentType = 'audio/wav';
                    break;
                default:
                    contentType = 'text/html';
            }

            // HTTP Status: 200 : OK
            response.writeHead(200, {'Content-Type': contentType, 'X-Powered-By': SERVER_NAME, 'Server': SERVER_NAME});

            response.end(data, 'utf-8');
        }
    });
});

server.listen(port, ADDRESS);
console.log("Awesome! pHOServer is running on: %s", ADDRESS + ':' + port);
