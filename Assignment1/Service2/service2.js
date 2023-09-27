const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      // Add remote address to the log entry
      const logEntry = `${body} ${req.socket.remoteAddress}:${req.socket.remotePort}\n`;

      // Write to service2.log
      fs.appendFile("/logs/service2.log", logEntry, (err) => {
        if (err) {
          console.error("Error writing to service2.log", err);
        }
      });

      if (body.trim() === "STOP") {
        // Close the log file and exit
        fs.closeSync(fs.openSync("/logs/service2.log", "a"));
        process.exit(0);
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("OK");
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(8000, () => {
  console.log("Service 2 is listening on port 8000");
});
