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
    port: 3000
  });

  // connect success
  socket.on("connect", () => {
    console.log("connected to Server!");
    socket.write('socketOn');
  });

  // server data print
  let buf = new Array();
  socket.on("data", data => {
    // console.log(Object.prototype.toString.call(data));
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
    console.log("error : " + e);
  });
  // connection timeout
  socket.on("timeout", () => {
    console.log("connection timeout");
  });
});