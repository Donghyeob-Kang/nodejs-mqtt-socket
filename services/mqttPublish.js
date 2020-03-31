const mqtt = require("mqtt");
require("dotenv").config();

const client = mqtt.connect(process.env.MQTT_URL, {
  username: process.env.MQTT_NAME,
  password: process.env.MQTT_PASSWORD
});

client.on("connect", () => {
  console.log(`mqtt publish connected : ${client.connected}`);
});

module.exports.publisher = (dName, fName, fSize) => {
  let data = {
    dName: dName,
    fName: fName,
    fSize: fSize
  };
  let msg = JSON.stringify(data);
  console.log("publish message : " + `${msg}`);
  client.publish("/aqua/image", msg);
};