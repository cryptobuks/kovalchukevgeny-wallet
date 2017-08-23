import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import favicon from 'serve-favicon';
import Busboy from 'busboy';
import fs from 'fs';

/*eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(express.static('public'));
app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.all('/api/uploadfile', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
 });

app.post('/api/uploadfile', (req, res) => {
  const busboy = new Busboy({ headers: req.headers });
	busboy.on('file', function(fieldname, file, filename) {
		let saveTo = path.join(__dirname, '../src/uploads/', filename);
		file.pipe(fs.createWriteStream(saveTo));
	});
	busboy.on('finish', function() {
		res.end('done');
	});
  res.on('close', function() {
    req.unpipe(busboy);
  });
	req.pipe(busboy);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
