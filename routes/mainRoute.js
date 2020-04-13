const router = require("express").Router();
const upload = require("../server").upload;
const imageResize = require("../services/imageResize").imageResize;
const imageSend = require("../services/imageSend").imageSend;
const publisher = require("../services/mqttPublish").publisher;
const db = require("../db/imageDB");

router.get("/", (req, res) => {
  res.render("index.html");
});

router.post("/imageUpload", upload.single("img"), (req, res) => {
  let fName =
    req.file.originalname.substr(0, req.file.originalname.length - 4) + ".jpg";
  // db.uploadImage(dName, fName, fSize, fPath, result => {
  // 현재 db 저장만 진행, 차후 service 시 db에서 인증하는 절차 필요
  imageResize(fName);
  publisher(fName, 0);
  imageSend(fName);
  // });

  res.redirect("/");
});

module.exports = router;