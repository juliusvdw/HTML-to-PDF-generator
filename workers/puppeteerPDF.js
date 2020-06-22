const puppeteer = require("puppeteer");

//Init Puppeteer job
const createPDF = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://github.com/juliusvdw", {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
};

modules.export = createPDF;
