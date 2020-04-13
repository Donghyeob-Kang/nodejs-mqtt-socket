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
      cb(null, file.originalname.substr(0, file.originalname.length - 4) + ".jpg");
    },
  }),
});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/static", express.static(__dirname + "/public"));
app.use("/js", express.static(__dirname + "/node_modules/axios/dist"));

const mainRoute = require("./routes/mainRoute");

app.use("/", mainRoute);

http.Server(app).listen(9009, () => {
  console.log("http server start on port 9009");
});