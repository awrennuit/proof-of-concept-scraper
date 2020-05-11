const request = require(`request`);
const cheerio = require(`cheerio`);

const listUrl = `https://en.wikipedia.org/wiki/The_World's_Billionaires`;

const customHeaderRequest = request.defaults({
  headers: {'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0`}
});

customHeaderRequest.get(listUrl, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      console.log('in there');
      const $ = cheerio.load(body);
      $(`.sortable`).each((i, el) => {
        console.log(2020-i);
        const info = $(el).find(`td`);
        console.log(info.text().replace(/\s\s+/g, ''));
      });
    }
});