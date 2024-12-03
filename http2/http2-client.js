const streamRequest = require("./stream-request");

// Import the fs module to read the certificate file
const fs = require("fs");

// Define the server URL with HTTP2
const serverUrl = "https://localhost:8443";

// Read the server certificate
const serverCert = fs.readFileSync("./server.crt");

// Get the process argument
const pathArg = process.argv[2];

console.log("Path argument:", pathArg);

switch (pathArg) {
  case "/stream":
    streamRequest.sendRequest(serverUrl, serverCert);
    break;
  default:
    break;
}
