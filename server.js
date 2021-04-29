
const express = require('express');
const app = express();
const rootPath = 'docs';
app.use(express.static(rootPath, { index: false }));
//index.htmlを勝手に見に行かない指定

const serveIndex = require('serve-index');
app.use(serveIndex(rootPath, {
  icons: true,
  view: 'details'
}));

app.listen(8080, ()=> {
  console.log('Start Express Server');
});