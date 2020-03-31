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
  console.log(JSON.parse(message));
});
