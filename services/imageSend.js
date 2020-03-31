const fs = require("fs");
const net = require("net");
const path = require("path");

const imageSend = (fName) => {
  // create server
  const server = net.createServer(socket => {
    console.log(socket.address().address + " connected!");
    // received client message
    socket.on("data", data => {
      console.log(data.toString())
      if (data.toString() === 'socketOn') {
        console.log('client socket start!')
        return
      } else {
        console.log('client socket not starting!')
      }
    })

    // send image data
    const dPath = path.join(__dirname, "../test/");
    // console.log(dPath + fName);
    fs.readFile(dPath + fName, "base64", (e, data) => {
      if (e) {
        throw e;
      } else {
        let base64 = Buffer.from(data, "base64");
        socket.write(base64);
        console.log("server image sended!!")
      }
      socket.end();
    });
  });
  server.listen(3000, () => {
    console.log("socket server start on port 3000");
  });
};

module.exports.imageSend = imageSend;