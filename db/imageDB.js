const pool = require("../services/database").pool;

module.exports.uploadImage = (dName, fName, fSize, fPath, callback) => {
  pool.getConnection((e, connection) => {
    if (!e) {
      const query =
        "INSERT INTO tbl_image (deviceName, fileName, fileSize, filePath) VALUES (?, ?, ?, ?)";
      connection.query(query, [dName, fName, fSize, fPath], (e, result) => {
        connection.release();
        if (!e) {
          callback(result);
        } else {
          console.log(e);
          callback(false);
          return;
        }
      });
    } else {
      console.log(e);
      callback(false);
      return;
    }
  });
};
