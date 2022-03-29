'use strict';
const util = require('./handler-util');
const Memo = require('./memo');

const pug = require('pug');

// トップページ周りの処理
function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
			Memo.findAll().then((memos) => {
				res.end(pug.renderFile('./views/memo.pug', { memos }));
			})
			break;
		case 'POST':
			// TODO Post
		default:
			break;
	}
}

// メモの編集周りの処理
function handleEditMemo(req, res) {
	switch (req.method) {
		// メモの編集ページを開いたときの処理
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
					// そのメモをアップデートする
					memo.update({
						title,
						content,
					}).then(() => {
						// トップページにリダイレクト
						handleRedirectToTop(req, res);
					})
				})
			});
	}
}

// メモ作成周りの処理
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
					handleRedirectToTop(req, res);
				})
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
module.exports = {
	handle,
	handleCreateMemo,
	handleEditMemo,
};
