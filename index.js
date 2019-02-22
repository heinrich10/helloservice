/* eslint-disable no-console */

const app = require('./src/app');
const registry = require('./src/lib/registry');
const loadCerts = require('./src/utils/load_certs');

const { PORT } = require('./config');

loadCerts().then((cert) => {
	registry.pubKey = cert;
	app().listen(PORT, () => {
		console.log(`http server listening on ${PORT}`);
	});
});
