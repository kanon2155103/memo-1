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
			// TODO POST の実装
			break;
		default:
			break;
	}
}

module.exports = {
	handle
};
