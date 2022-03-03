'use strict';
const http = require('http');
const server = http.createServer((req, res) => {
	res.writeHead(302, {
		Location:'https://thawing-basin-10677.herokuapp.com/'
	});
	res.end();
})
.on('error', e => {
	console.error('Server Error', e);
})
.on('clientError', e => {
	console.error('Client Error', e);
});

const port = 8000;
server.listen(port, () => {
	console.info('Listening on ' + port);
});
