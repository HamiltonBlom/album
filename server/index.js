const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const cors = require("cors");
const path = require("path");
const child_process = require("child_process");

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


const child = child_process.exec("npx vite");

console.log("app listening on: http://localhost:3000")

app.use("/uploads/", express.static(__dirname + "/uploads"))

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
  console.log(req.body);
  sampleFile = req.files.image;
  uploadPath = __dirname + "/uploads/" + sampleFile.name;

  sampleFile.mv(uploadPath, async function (err) {
    if (err) return res.status(500).send(err);
    const data = {
      name: req.body.name,
      filepath: sampleFile.name,
    };

    const db = await (async () => {

        try {
            return JSON.parse(await fs.readFile(__dirname + "/database.json", "utf8"));
        } catch (error) {
            console.log(error)
            return [];
        }
    })();
    db.push(data);
    await fs.writeFile(__dirname + "/database.json", JSON.stringify(db));

    res.redirect(301, "http://localhost:3000/album.html");
  });
});

app.get("/uploads", (req, res) => {

  res.sendFile(path.resolve(__dirname, "./database.json"));

});

app.listen(4000, console.log);
