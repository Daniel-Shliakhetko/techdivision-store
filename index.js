const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const app = express();

const PORT = config.get("port");

mongoose
  .connect(config.get("mongoDB"))
  .then(() => {
    console.log("Connected DB");
  })
  .catch((err) => {
    console.log(err);
  });

const conn = mongoose.createConnection(config.get("mongoDB"), () => {});

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

app.listen(PORT, () => {
  console.log(`Listening ${PORT}...`);
});

app.use(express.json({ extended: true }));

// app.post("/api/upload", imageUpload.single("file"), (req, res) => {
//   res.json({ file: req.file });
//   console.log(req.file);
// });

// app.get("/api/photos/:filename", async (req, res) => {
//   try {
//     await gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//       if (err) return console.log(err);
//       if (file) {
//         if (!file || file.length === 0) {
//           console.log("not found");
//           return res.status(404).json({
//             err: "No file exists",
//           });
//         }
//         if (
//           file.contentType === "image/jpeg" ||
//           file.contentType === "image/png"
//         ) {
//           let readStream = gfs.createReadStream({
//             // filename: file.filename,
//             _id:mongoose.Types.ObjectId("6316348d63068482cb888ab1"),
//           });

//           readStream.on("open", () => readStream.pipe(res));

//           readStream.on("end", () => res.end());

//           podcastReadStream.on("error", (error) => next(error));
//         }
//       } else {
//         res.status(500).json({ message: "Nothing found" });
//       }
//     });
//   } catch (e) {
//     res.status(500).json({ message: "Nothing found or something went wrong" });
//     console.log(e);
//   }
// });

app.use("/api/photos", require("./routes/photos.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/product", require("./routes/product.routes"));
