'use strict';
const util = require('./handler-util');
const Memo = require('./memo');

const pug = require('pug');

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(pug.renderFile('./views/memo.pug'));
			break;
		case 'POST':
			let body = [];
			req.on('data', (chunk) => {
				body.push(chunk);
			}).on('end', () => {
				body = Buffer.concat(body).toString();
				const params  = new URLSearchParams(body);
				constcontent = params.get('content');
				console.info('内容を保存しました。')
			});
			break;
		default:
			break;
	}
}

function handleCreateMemo(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html; chtrset=utf-8'
	});
	res.end(pug.renderFile('./views/new.pug'));
}

module.exports = {
	handle,
	handleCreateMemo
};
