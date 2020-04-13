const jimp = require("jimp");
const path = require("path");

const dPath = path.join(__dirname, "../test/");
module.exports.imageResize = (fName) => {
  jimp.read(dPath + fName, (e, img) => {
    if (e) {
      throw e;
    };
    img
      .quality(50)
      .resize(320, 480)
      .write(dPath + fName);
  });
};