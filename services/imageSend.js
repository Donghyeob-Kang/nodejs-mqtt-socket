const fs = require("fs");
const net = require("net");
const path = require("path");

const imageSend = (fName) => {
  // create server
  const server = net.createServer((socket) => {
    // received client message
    socket.on("data", (data) => {
      console.log(data.toString());
      if (data.toString() === "on") {
        console.log("client socket start!");
        // send image data
        const dPath = path.join(__dirname, "../test/");
        fs.readFile(dPath + fName, "base64", (e, data) => {
          if (e) {
            throw e;
          } else {
            let base64 = Buffer.from(data, "base64");
            socket.write(base64);
            console.log("server image sended!!");
          }
          socket.end();
          server.close();
        });
      } else {
        console.log("client socket not starting!");
      }
    });
  });

  server.listen(3000, () => {
    console.log("socket server start on port 3000");
    server.on("close", () => {
      console.log("socket server stop");
    });
    server.on("connection", () => {
      console.log("socket server entered!");
    });
  });
};

module.exports.imageSend = imageSend;