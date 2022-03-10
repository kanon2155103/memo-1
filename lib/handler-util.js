'use strict';
const fs = require('fs');

function handleRedirect(req, res) {
	res.writeHead(302, {
		'Location': '/memo'
	})
	res.end();
}

module.exports = {
	handleRedirect
};
