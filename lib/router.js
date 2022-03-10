'use strict';
const handler = require('./handler');
const util = require('./handler-util');

function route(req, res) {
	switch (req.url) {
		case '/':
			util.handleRedirect(req, res);
		case '/memo':
			handler.handle(req, res);
			break;
		case '/trash':
			// モジュールの追加
			break;
		case '/memo/{memoId}':
			// モジュールの追加
			break;
		case '/memo/{memoId}?delete=1':
			handler.handleDelete(req, res);
			break;
		case '/memo/{memoId}?edit=1':
			handler.handleEdit(req, res);
			break;
		default:
			break;
	}
}

module.exports = {
	route
};
