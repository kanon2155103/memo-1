'use strict';
const handler = require('./handler');
const util = require('./handler-util');

function route(req, res) {
	// ここだけ特別です！
	// 「/memo/メモID」をhandleします
	// 正規表現はswitch文では判定できないため、特別にここで判定しています
	if (/\/memo\/.+/.test(req.url)) {
		handler.handleEditMemo(req, res);
		// ここでreturnして処理を終わらさないと↓のswitch文が実行され、util.handleNotFoundが実行されてしまう
		return;
	}
	switch (req.url) {
		case '/':
			util.handleRedirect(req, res);
			break;
		case '/memo':
			handler.handle(req, res);
			break;
		case '/trash':
			handler.handleTrashMemo(req, res);
			break;
		case '/new':
			handler.handleCreateMemo(req, res);
			break;
		case '/memo?delete=1':
			handler.handleDeleteMemo(req, res);
			break;
		case '/memo?edit=1':
			handler.handleEditMemo(req, res);
			break;
		case '/memo?lock=1':
			handler.handleLockMemo(req, res);
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
