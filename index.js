const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const imageUpload = require("./middleware/imageUpload.js");

const app = express();

const PORT = config.get("port");

const conn = mongoose.createConnection(config.get("mongoDB"));

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  // gfs.collection("photos");
});

app.listen(PORT, () => {
  console.log(`Listening ${PORT}...`);
});

app.use(express.json({ extended: true }));

app.post("/upload", imageUpload.single("file"), (req, res) => {
  res.json({ file: req.file });
  console.log(req.file);
});

app.get("/photos/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (file) {
      const readStream = gfs.createReadStream({ filename: req.params.filename });
      readStream.pipe(res);
    }
  } catch (e) {
    res.status(500).json({ message: "Nothing found or something went wrong" });
    console.log(e);
  }
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/product", require("./routes/product.routes"));
