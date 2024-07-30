const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/save-misclassified", (req, res) => {
  const { input, label } = req.body;

  const filePath = path.join(__dirname, "datasets", "mnist", "misclassified-data.json");

  fs.readFile(filePath, (err, data) => {
    if (err && err.code === "ENOENT") {
      const data = {labels: [label], inputs: [input]};
      const stringData = JSON.stringify(data, null, 0);

      fs.writeFile(filePath, stringData, (err) => {
        if (err) {
          res.status(500).send("Error saving data!");
        } else {
          res.status(200).send("Data saved succesfuly!");
        }
      });
    } else if (err) {
      res.status(500).send("Error reading file");
    } else {
      const jsonData = JSON.parse(data);

      jsonData.labels.push(label);
      jsonData.inputs.push(input);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 0), (err) => {
        if (err) {
          res.status(500).send("Error saving file!");
        } else {
          res.status(200).send("Data saved succesfuly!");
        }
      });
    }
  });

});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});
