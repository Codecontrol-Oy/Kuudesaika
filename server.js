const koa = require('koa');
const crypto = require('crypto');
const convert = require('koa-convert'); 
const session = require('koa-generic-session');
const route = require('koa-route');
const config = require('./webpack.config');
const internalIp = require('internal-ip');
const url = require('url');
const webpack = require('webpack');
const fs = require('fs');
const cors = require('koa-cors');
const app = new koa();
const compiler = webpack(config);

const options = {
	origin: true
};

app.use(convert(cors(options)));
app.keys = ['U8ryVnRZVIb4hLv5OwjJ89wdXT4H1h67'];

app.use(require('koa-webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  silent: false,
  stats: { color: true }
}));
app.use(require('koa-webpack-hot-middleware')(compiler));

app.use(route.get('/', function (ctx) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/www/index.html');
  }
));

app.use(route.get('*', function (ctx) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/www/index.html');
}));


const port = 8080;
const ip = internalIp.v4();

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(' --------------------------------------');
  console.log(`    Local: http://0.0.0.0:${port}`);
  console.log(` External: http://${ip}:${port}`);
  console.log(' --------------------------------------');
});