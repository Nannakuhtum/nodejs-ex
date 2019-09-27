const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Readability = require('./Readability');
const puppeteer = require('puppeteer');


async function getClutterFreeHtml(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const bodyHTML = await page.evaluate(() => document.body.innerHTML);

    await browser.close();

    const dom = new JSDOM(bodyHTML, {
        url: url,
        referrer: "https://google.com/",
        contentType: "text/html",
        includeNodeLocations: true,
        storageQuota: 10000000
    });

    const clutterFreeArticle = new Readability(dom.window.document).parse();

    console.log('clutterFreeArticle', clutterFreeArticle);

    return clutterFreeArticle;
}

module.exports = {
    getClutterFreeHtml
};