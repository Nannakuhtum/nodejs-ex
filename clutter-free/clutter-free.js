const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Readability = require('./Readability');
const request = require('request-promise-native');

async function getClutterFreeHtml(url) {
    const bodyHTML = await request(url);        
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