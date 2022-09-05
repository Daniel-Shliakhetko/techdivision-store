const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const config = require("config");

const storage = new GridFsStorage({
  url: config.get("mongoDB"),
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    const filename = `${Date.now()}-${file.originalname}`;

    if (match.indexOf(file.mimetype) === -1) {
      return filename;
    }

    return{
        bucketName:'photos',
        filename:filename
    }
  },
});
module.exports = multer({storage});