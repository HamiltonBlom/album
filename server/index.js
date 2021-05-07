const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs").promises;

// default options
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
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

    res.send("ye!");
  });
});

app.listen(4000, console.log);
