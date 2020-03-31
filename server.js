const express = require("express");
const app = express();
const http = require("http");

const multer = require("multer");

module.exports.upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/test");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});

// TCP socket server------------------------------------
// const net = require("net");
// // create Server
// const server = net.createServer(socket => {
//   console.log(socket.address().address + "  connected!");
//   // send image data
//   fs.readFile(__dirname + "/test/image1.jpg", "base64", (e, data) => {
//     fs.stat(__dirname + "/test/image1.jpg", (e, stats) => {
//       console.log("fileSize : " + stats.size);
//     });
//     if (e) {
//       throw e;
//     } else {
//       // console.log(data);
//       let base64 = Buffer.from(data, "base64");
//       socket.write(base64);
//       console.log("server image send success!");
//     }
//     socket.end();
//   });

//   // client welcom message
//   // socket.write("welcome to server!");

//   // create received client message
//   socket.on("data", data => {
//     fs.writeFile(__dirname + "/test2", data, e => {
//       if (e === null) {
//         console.log("success");
//       } else {
//         console.log("fail");
//       }
//     });
//   });

//   // closed client connect
//   socket.on("close", () => {
//     console.log("client disconnected.");
//   });
// });

// server.on("error", e => {
//   console.log("error: " + e);
// });

// server.listen(3000, () => {
//   console.log("socket server start on port 3000");
// });
//------------------------------------------------------

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use("/static", express.static(__dirname + "/public"));
app.use("/js", express.static(__dirname + "/node_modules/axios/dist"));

const mainRoute = require("./routes/mainRoute");

app.use("/", mainRoute);

http.Server(app).listen(9999, () => {
  console.log("http server start on port 9999");
});