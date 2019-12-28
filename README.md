# hentai scrappers API
A API wrapper that reads the HTML of the site and extracts info

# Install
``` npm install --save hentai-scrappers ```

# API
```
const XlecxAPI = require('api2-xlecx-com').XlecxAPI
const api = new XlecxAPI();
api.comic.id('7750-sidney-fast-times-rampr-high').then((comic)=> console.log(JSON.stringify(comic, null, 2)));
```
