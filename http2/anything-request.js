// Import the http2 module
const http2 = require("http2");

function sendRequest(serverUrl, serverCert) {
  // Hardcoded JSON data
  const jsonData = {
    key1: "value1",
    key2: "value2",
  };
  const bufferData = Buffer.from(JSON.stringify(jsonData));

  // Create a client session with TLS
  const client = http2.connect(serverUrl, {
    ca: serverCert,
  });

  // Create a request to the server with the updated path and method
  const req = client.request({
    ":path": "/anything",
    ":method": "POST",
  });

  // Listen for response data
  req.on("response", (headers, flags) => {
    console.log("Response headers:", headers);
  });

  // Listen for data events and log the response data
  req.on("data", (chunk) => {
    console.log("Received data:", chunk.toString());
  });

  // Send JSON data to the server
  req.write(bufferData);

  // End the request
  req.end();

  // Listen for the end of the response
  req.on("end", () => {
    console.log("Response ended.");
    client.close();
  });

  // Handle errors
  req.on("error", (err) => {
    console.error("Request error:", err);
  });
}

module.exports = { sendRequest };
