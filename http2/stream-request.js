// Import the http2 module
const http2 = require("http2");

function sendRequest(serverUrl, serverCert) {
  // Create a client session with TLS
  const client = http2.connect(serverUrl, {
    ca: serverCert,
  });

  // Create a request to the server
  const req = client.request({ ":path": "/stream" });

  // Listen for response data
  req.on("response", (headers, flags) => {
    console.log("Response headers:", headers);
  });

  // Listen for data events and log the response data
  req.on("data", (chunk) => {
    console.log("Received data:", chunk.toString());
  });

  // Listen for the end of the response
  req.on("end", () => {
    console.log("Response ended.");
    client.close();
  });

  // Handle errors
  req.on("error", (err) => {
    console.error("Request error:", err);
  });

  // End the request
  req.end();
}

module.exports = { sendRequest };
