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
			// TODO Post
		default:
			break;
	}
}

function handleCreateMemo(req, res) {
	switch (req.method) {
		case 'GET':
			res.writeHead(200, {
				'Content-Type': 'text/html; chtrset=utf-8'
			});
			res.end(pug.renderFile('./views/new.pug'));
			break;
		case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
			}).on('end', () => {
        body = Buffer.concat(body).toString();
        const params = new URLSearchParams(body);
				const title = params.get('title');
        const content = params.get('content');
				console.info('内容を保存しました。' + title)
				Memo.create({
					title,
					content
				}).then(() => {
					handleredirectMemo(req, res);
				})
			});
			break;
	}
}

function handleredirectMemo(req, res) {
	res.writeHead(302, {
		'Location': '/new'
	})
	res.end()
}
module.exports = {
	handle,
	handleCreateMemo
};
