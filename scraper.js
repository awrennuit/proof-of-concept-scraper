const request = require(`request`);
const cheerio = require(`cheerio`);

const listUrl = `https://en.wikipedia.org/wiki/The_World's_Billionaires`;

const customHeaderRequest = request.defaults({
  headers: {'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0`}
});

// customHeaderRequest.get(listUrl, (error, response, body) => {
//     if(!error && response.statusCode === 200) {
//       const $ = cheerio.load(body);
//       $(`.sortable tr td`).each((i, el) => {
//         if(2020 - i === 1999) {
//           return;
//         }
//         console.log(2020-i);
//         console.log('el:', $(el).text());
//         // const info = $(el).find(`td`);
//         // console.log(info.text());
//       });
//     }
// });

customHeaderRequest.get(listUrl, (error, response, body) => {
  if(!error && response.statusCode === 200) {
    const $ = cheerio.load(body);
    let year = 2020;
    $(`.sortable tr td`).each((i, el) => {
      if(year <= 1999) {
        return;
      }
      if(+$(el).text() <= 10) {
        if(+$(el).text() === 1) {
          console.log('-------------------------------------------------------------------------');
          console.log(year);
          year--;
        }
        console.log('rank:', $(el).text().trim());
        console.log('name:', $(el).next().text().trim());
        console.log('worth:', $(el).next().next().text().trim());
        console.log('age:', $(el).next().next().next().text().trim());
        console.log('country:', $(el).next().next().next().next().text().trim());
        console.log('business:', $(el).next().next().next().next().next().text().trim());
        console.log(' ');
      }
      else {
        return;
      }
    });
  }
});