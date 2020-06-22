const puppeteer = require("puppeteer");

//Init Puppeteer job
const createPDF = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}`, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A4" });

  console.log("PDF generated");
  await browser.close();
  return pdf;
};

module.exports = createPDF;
