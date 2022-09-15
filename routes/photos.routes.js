const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
var streamifier = require("streamifier");
var fs = require("fs");
const imageUpload = require("../middleware/imageUpload.js");

// router.post("/upload", (req, res) => {
//   let filename = req.files.file.name;
//   console.log("works!")

//   var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     chunkSizeBytes: 1024,
//     bucketName: "photos",
//   });

//   console.log(req.files);

//   streamifier
//     .createReadStream(req.files.file.data)
//     .pipe(gridfsbucket.openUploadStream(filename))
//     .on("error", function (error) {
//       console.log("error" + error);
//       assert.ifError(error);
//     })
//     .on("finish", function () {
//       console.log("done!");
//       res.status(200).json({
//         success: true,
//         msg: "File Uploaded successfully..",
//       });
//     });
// });

router.post("/upload", imageUpload.single("file"), (req, res) => {
  res.json({ file: req.file });
  console.log(req.file);
});

router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;

  var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    chunkSizeBytes: 1024,
    bucketName: "photos",
  });

  gridfsbucket
    .openDownloadStreamByName(filename)
    .pipe(fs.createWriteStream("./" + filename))
    .on("error", function (error) {
      console.log("error" + error);
      res.status(404).json({
        msg: error.message,
      });
    })
    .on("finish", function () {
      console.log("done!");
      res.send("Downloaded successfully!");
    });
});

module.exports = router;
