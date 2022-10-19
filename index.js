const { getPhoneAndName, getCategoryPageLinks, getDetailLinks } = require("./helpers");
var fs = require('fs');


(async function crawl() {
    let result = [];
    let records = 0;
    let limit = 10;
    let categoryUrls = await getCategoryPageLinks('https://www.chotot.com');
    let chototOnlyCategoryUrls = categoryUrls.filter( (catUrl) => catUrl.startsWith('https://www.chotot.com'));
    loop1: for(const chototOnlyCategoryUrlIndex in chototOnlyCategoryUrls) {
        let page = 1;
        let shouldLoadNextPage = true;
        loop2: while(shouldLoadNextPage) {
            let detailLinks = await getDetailLinks(chototOnlyCategoryUrls[chototOnlyCategoryUrlIndex]+'?page='+page);
            if(detailLinks.length != 0) {
                loop3: for(const detailLinkIndex in detailLinks) {
                    let detail = await getPhoneAndName(detailLinks[detailLinkIndex]);
                    if(records < limit) {
                        result.push(detail);
                        records++;
                    }  else {
                        break loop1;
                    }
                }
            } else {
                shouldLoadNextPage = false;
            }
        }
        page++;
    }
    fs.writeFileSync('phones.json', JSON.stringify(result));
})();
