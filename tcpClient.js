const net = require("net");
const fs = require("fs");

const mqtt = require("mqtt");
require("dotenv").config();

const client = mqtt.connect(process.env.MQTT_URL, {
  username: process.env.MQTT_NAME,
  password: process.env.MQTT_PASSWORD
});

client.subscribe("/aqua/image");
client.subscribe("/aqua/esp");

client.on("connect", () => {
  console.log(`mqtt subscribe connected : ${client.connected}`);
});

client.on("message", (topic, message) => {
  msg = JSON.parse(message);
  console.log(msg);
  console.log(msg.fName)

  // server connect
  const socket = net.connect({
    // host: '1.234.51.99',
    port: 3000
  })

  // connect success
  socket.on("connect", () => {
    console.log("connected to Server!");
    socket.write('socketOn');
  });

  // server data print
  let buf = new Array();
  socket.on("data", data => {
    buf.push(data);
  });

  // disconnected
  socket.on("end", () => {
    const i = Buffer.concat(buf);
    console.log(Object.prototype.toString.call(i));
    fs.writeFile(msg.fName, i, e => {
      if (e) {
        throw e;
      } else {
        console.log("file saved");
        return true;
      }
    });
    console.log("disconnected!");
  });

  // error
  socket.on("error", e => {
    console.log(e);
  });

  // connection timeout
  socket.on("timeout", () => {
    console.log("connection timeout");
  });
});