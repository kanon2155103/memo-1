'use strict';
const fs = require('fs');
const pug = require('pug');

function handleRedirect(req, res) {
	res.writeHead(302, {
		'Location': '/memo'
	})
	res.end();
}

function handleCreateMemo(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html; chtrset=utf-8'
	});
	res.end(pug.renderFile('./views/new.pug'));
}

module.exports = {
	handleRedirect,
	handleCreateMemo
};
