/* eslint-disable no-console */

const app = require('./src/app');
const registry = require('./src/lib/registry');
const loadCerts = require('./src/utils/load_certs');

loadCerts().then((cert) => {
	registry.pubKey = cert;
	app().listen(6020, () => {
		console.log('running');
	});
});
