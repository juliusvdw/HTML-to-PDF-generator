const express = require("express");

//Bring in Workers
const createPDF = require("./workers/puppeteerPDF.js");

//Init App
const app = express();

//Init app middleware
app.use(express.json());

//Create HTML to PDF Route
//Route is created on Server file, as there is only one route
app.get("/pdf", async (req, res, next) => {
  const url = req.body.url;

  try {
    const pdf = await createPDF(url);

    //Send error + return next if pdf cannot be created
    if (!pdf || pdf === undefined) {
      res.status(400).json({ sucess: false });
      return next;
    }

    //Send Buffer generated with createPDF if successful
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });

    //Send PDF to client
    res.status(200).send(pdf);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err });
  }
});

//Declare PORT var
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server has started on Port 5000"));
