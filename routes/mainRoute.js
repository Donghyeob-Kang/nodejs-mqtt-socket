const router = require("express").Router();
const publish = require("../services/mqttPublish");
const upload = require("../server").upload;
const imageSend = require("../services/imageSend");
const db = require("../db/imageDB");

router.get("/", (req, res) => {
  res.render("index.html");
});

router.post("/imageUpload", upload.single("img"), (req, res) => {
  // console.log(req.body.deviceName);
  // console.log(req.file);
  let dName = req.body.deviceName;
  let fName = req.file.originalname;
  let fSize = req.file.size;
  let fPath = req.file.path;

  db.uploadImage(dName, fName, fSize, fPath, result => {
    // 현재 db 저장만 진행, 차후 service 시 db에서 인증하는 절차 필요
    imageSend.imageSend(fName);
    publish.publisher(dName, fName, fSize);
  });

  res.redirect("/");
});

module.exports = router;