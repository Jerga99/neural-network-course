const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/save-misclassified", (req, res) => {
  const { input, label } = req.body;

  console.log(input);
  console.log(label);


  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});
