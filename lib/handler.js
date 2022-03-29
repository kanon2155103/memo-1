'use strict';
const util = require('./handler-util');
const Memo = require('./memo');

const pug = require('pug');

// トップページ周りの処理
function handle(req, res) {
  switch (req.method) {
		// トップページを開かれたときの処理
		// 「/ GET」
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
			// isDeletedがfalse(つまり、トラッシュされていない)のMemoを全て取得
			Memo.findAll({
				where: {
					isDeleted: false,
				}
			}).then((memos) => {
				res.end(pug.renderFile('./views/memo.pug', { memos }));
			})
			break;
		default:
			break;
	}
}

// メモのトラッシュ周りの処理
// トラッシュと削除は違います！
// トラッシュしても表示はさせたいので、トラッシュはisDeletedをtrueにするだけ、削除は完全に削除しちゃいます
function handleTrashMemo(req, res) {
	switch (req.method) {
		// ゴミ箱を開かれたときの処理
		// 「/trash GET」
		case 'GET':
			res.writeHead(200, {
				'Content-Type': 'text/html; chtrset=utf-8'
			});
			Memo.findAll({
				where: {
					isDeleted: true,
				}
			}).then((memos) => {
				res.end(pug.renderFile('./views/trash.pug', { memos }));
			});
			break;
		// トラッシュ or トラッシュ解除されたときの処理
		// 「/trash POST」
		case 'POST':
			res.writeHead(200, {
				'Content-Type': 'text/html; chtrset=utf-8'
			});
			req.on('data', (chunk) => {
        body.push(chunk);
			}).on('end', () => {
        body = Buffer.concat(body).toString();
        const params = new URLSearchParams(body);
				// トラッシュしたいメモのIdも一緒に送る
				// メモをトラッシュしたい時はisDeleted: true, トラッシュから削減したい時はisDelete: falseを送る
				const memoId = params.get('memoId');
				const isDeleted = params.get('isDeleted');
				// 送られてきたmemoIdからメモを取得する
				Memo.findByPk(memoId).then((memo) => {
					memo.update({
						isDeleted: isDeleted,
					}).then(() => {
						// trashページにリダイレクト
						handleRedirectToTrash(req, res);
					})
				})
			});
			break;
	}
}

// メモの編集周りの処理
function handleEditMemo(req, res) {
	switch (req.method) {
		// メモの編集ページを開いたときの処理
		// 「/memo/メモID GET」
		case 'GET':
			res.writeHead(200, {
				'Content-Type': 'text/html; chtrset=utf-8'
			});
			// メモIDを取得する。req.urlは '/memo/メモID' の形で取得できる
			// ↓split関数
			// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/split
			const memoId = req.url.split('/')[1];
			// プライマリーキーからメモを取得する
			Memo.findByPk(memoId).then((memo) => {
				res.end(pug.renderFile('./views/edit.pug', {
					// メモの情報をedit.pugに送り、表示する
					memo: memo,
				}));
			});
			break;
		// メモの編集API
		// 「/memo?edit=1 POST」
		case 'POST':
			let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
			}).on('end', () => {
        body = Buffer.concat(body).toString();
        const params = new URLSearchParams(body);
				// 編集ページで編集したいメモのIdも一緒に送る
				const memoId = params.get('memoId');
				const title = params.get('title');
        const content = params.get('content');
				// 送られてきたmemoIdからメモを取得する
				Memo.findByPk(memoId).then((memo) => {
					// そのメモをアップデートする。
					// update関数は指定した項目だけアップデートしてくれます。今回はtitleとcontent
					memo.update({
						title: title,
						content: content,
					}).then(() => {
						// トップページにリダイレクト
						handleRedirectToTop(req, res);
					})
				})
			});
			break;
	}
}

// メモ作成周りの処理
function handleCreateMemo(req, res) {
	switch (req.method) {
		// メモ作成ページを開いたときの処理
		// 「/new GET」
		case 'GET':
			res.writeHead(200, {
				'Content-Type': 'text/html; chtrset=utf-8'
			});
			res.end(pug.renderFile('./views/new.pug'));
			break;
		// メモ作成API
		// 「/new POST」
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
				// memoを作成、nullを許容しないフィールドは絶対に設定しないといけない！
				// idは勝手にautoIncrementしてくれるので設定する必要なし
				Memo.create({
					title: title,
					content: content,
					isLocked: false,
					isDeleted: false,
				}).then(() => {
					handleRedirectToTop(req, res);
				})
			});
			break;
	}
}

// メモ削除周りの処理
function handleDeleteMemo(req, res) {
	switch (req.method) {
		// 削除API
		// 「/memo?delete=1 POST」
		case 'POST':
			let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
			}).on('end', () => {
        body = Buffer.concat(body).toString();
        const params = new URLSearchParams(body);
				// 削除したいメモのIDを送る
				const memoId = params.get('memoId');
				// 送られてきたmemoIdからメモを取得する
				Memo.findByPk(memoId).then((memo) => {
					// そのメモを削除する
					memo.destroy().then(() => {
						handleRedirectToTop(req, res);
					});
				});
			});
			break;
	}
}

// トップページにリダイレクトさせるfunction
function handleRedirectToTop(req, res) {
	res.writeHead(302, {
		'Location': '/memo'
	})
	res.end()
}
// トラッシュページにリダイレクトさせるfunction
function handleRedirectToTrash(req, res) {
	res.writeHead(302, {
		'Location': '/trash'
	})
	res.end()
}

module.exports = {
	handle,
	handleCreateMemo,
	handleEditMemo,
	handleDeleteMemo,
	handleTrashMemo,
};
