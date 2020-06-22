const express = require("express");

//Bring in Workers
const createPDF = require("./workers/puppeteerPDF.js");

//Init App
const app = express();

//Create HTML to PDF Route
//Route is created on Server file, as there is only one route
app.get("/pdf/:websiteLink", async (req, res) => {
  try {
    const pdf = await createPDF();

    if (!pdf || pdf === undefined) {
      res.status(400).json({ sucess: false });
    }

    res.status(200).json({ sucess: true, pdf });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error });
  }
});

app.listen(5000, console.log("Server has started on Port 5000"));
