const puppeteer = require("puppeteer-core");

//Init Puppeteer job
const createPDF = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://github.com/juliusvdw", {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ path: "page.pdf", format: "A4" });

  console.log("PDF generated");
  await browser.close();
  return pdf;
};

module.exports = createPDF;
