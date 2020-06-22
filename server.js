const express = require("express");

//Bring in Workers
const createPDF = require("./workers/puppeteerPDF.js");

//Init App
const app = express();

//Init app.use
app.use(express.json());

//Create HTML to PDF Route
//Route is created on Server file, as there is only one route
app.get("/pdf", async (req, res, next) => {
  const url = req.body.url;

  try {
    const pdf = await createPDF(url);

    if (!pdf || pdf === undefined) {
      res.status(400).json({ sucess: false });
      return next;
    }

    //Send Buffer generated with createPDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });

    res.status(200).send(pdf);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err });
  }
});

app.listen(5000, console.log("Server has started on Port 5000"));
