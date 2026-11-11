/**
 * Prints the CV (Harvard format) into the PDFs the home page offers, one per language:
 *   public/docs/CV_SebastianAlvarez_EN.pdf and public/docs/CV_SebastianAlvarez_ES.pdf
 *
 * The source is /api/cv/<lang>, which reads the same role data as the career section, so run this after
 * changing src/lib/data/experiences.ts or src/lib/data/cv.ts, with the site running:
 *   npm run dev            (in another terminal)
 *   npm run cv:pdf         (CV_ORIGIN=http://localhost:9008 by default; CHROME_PATH to use another Chrome)
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const ORIGIN = process.env.CV_ORIGIN || "http://localhost:9008";
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const LANGS = ["en", "es"];
const MAX_PAGES = 2;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
  });
  try {
    const tooLong = [];
    for (const lang of LANGS) {
      const page = await browser.newPage();
      const response = await page.goto(`${ORIGIN}/api/cv/${lang}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      if (!response || !response.ok())
        throw new Error(
          `/api/cv/${lang} answered ${response && response.status()}`,
        );
      const file = path.join(
        __dirname,
        "..",
        "public",
        "docs",
        `CV_SebastianAlvarez_${lang.toUpperCase()}.pdf`,
      );
      const pdf = Buffer.from(await page.pdf({ format: "Letter", preferCSSPageSize: true, printBackground: false }));
      fs.writeFileSync(file, pdf);
      const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page(?![a-zA-Z])/g) || []).length;
      console.log(`${path.relative(process.cwd(), file)}: ${pages} page${pages === 1 ? "" : "s"}`);
      if (pages > MAX_PAGES) tooLong.push(lang);
      await page.close();
    }
    if (tooLong.length) throw new Error(`CV longer than ${MAX_PAGES} pages: ${tooLong.join(", ")}`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
