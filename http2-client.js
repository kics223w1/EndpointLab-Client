// Import the http2 module
const http2 = require("http2");

// Import the fs module to read the certificate file
const fs = require("fs");

// Define the server URL with HTTP2
const serverUrl = "https://localhost:8443";

// Read the server certificate
const serverCert = fs.readFileSync("./server.crt");

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
