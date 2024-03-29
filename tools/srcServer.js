import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import favicon from 'serve-favicon';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as db from './../server/utils/DataBaseUtils';

const port = 3000;
const app = express();
const compiler = webpack(config);

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use(bodyParser.json());

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(favicon(path.join(__dirname,'assets', 'public', 'favicon.ico')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err); // eslint-disable-line no-console
  } else {
    open(`http://localhost:${port}`);
  }
});
