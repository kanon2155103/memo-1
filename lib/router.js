'use strict';
const handler = require('./handler');
const util = require('./handler-util');

function route(req, res) {
	switch (req.url) {
		case '/':
			util.handleRedirect(req, res);
			break;
		case '/memo':
			handler.handle(req, res);
			break;
		case '/trash':
			util.handleTrash(req, res);
			break;
		case '/new':
			handler.handleCreateMemo(req, res);
			break;
		case '/memo/{memoId}':
			// モジュールの追加
			break;
		case '/memo?delete=1':
			handler.handleDelete(req, res);
			break;
		case '/memo?edit=1':
			handler.handleEdit(req, res);
			break;
		case '/favicon.ico':
			util.handleFavicon(req, res);
			break;
		default:
			util.handleNotFound(req, res);
			break;
	}
}

module.exports = {
	route
};
