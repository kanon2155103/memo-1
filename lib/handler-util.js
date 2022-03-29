'use strict';
const fs = require('fs');
const pug = require('pug');

function handleRedirect(req, res) {
	res.writeHead(302, {
		'Location': '/memo'
	})
	res.end();
}

function handleNotFound(req, res) {
	res.writeHead(404, {
		'Content-Type': 'text/html; charset=utf-8'
	});
	res.write('<p>ページがみつかりません</p>')
	res.write('<p><a href="/memo">トップページ</a></p>')
}

function handleBadReqest(req, res) {
	res.writeHead(400, {
		'Content-Type': 'text/plain; charset=utf-8'
	});
	res.end('未対応のリクエストです。')
}

function handleFavicon(req, res) {
	res.writeHead(200, {
		'Content-Type': 'image/vnd.microsoft.ico'
	});
	const favicon = fs.readFileSync('./favicon.ico');
	res.end(favicon);
}

module.exports = {
	handleRedirect,
	handleNotFound,
	handleBadReqest,
	handleFavicon
};
