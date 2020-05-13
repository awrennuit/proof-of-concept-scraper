const request = require(`request`);
const cheerio = require(`cheerio`);

const listUrl = `https://en.wikipedia.org/wiki/The_World's_Billionaires`;

const customHeaderRequest = request.defaults({
  headers: {'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0`}
});

let topBillionairesPerYear = [];

customHeaderRequest.get(listUrl, (error, response, body) => {
  if(!error && response.statusCode === 200) {
    const $ = cheerio.load(body);
    let year = 2020;
    let runningBillionaireList = [];
    $(`.sortable tr td`).each((i, el) => {
      if(year <= 1999) {
        return;
      }
      if(+$(el).text() <= 10) {
        if(+$(el).text() === 1) {
          if(runningBillionaireList.length !== 0) {
            topBillionairesPerYear.push({
              [year + 1]: runningBillionaireList
            });
            runningBillionaireList = [];
          }
          year--;
        }
        runningBillionaireList.push({
          rank: $(el).text().trim(),
          name: $(el).next().text().trim(),
          worth: $(el).next().next().text().trim(),
          age: $(el).next().next().next().text().trim(),
          country: $(el).next().next().next().next().text().trim(),
          business: $(el).next().next().next().next().next().text().trim()
        });
        // console.log('running list:', runningBillionaireList);
      }
      else {
        return;
      }
    });
  }
  // console.log('billionaires:', topBillionairesPerYear);
});