'use strict';
const got = require('got').default;
const pkg = require('../../package.json');

/**
 * Returns the latest TypeScript version. If we are up-to-date with the latest version, it will return nothing.
 */
exports.targetVersion = async () => {
	// Retrieve the tags fro the npm registry
	const body = await got.get('https://registry.npmjs.org/typescript').json();

	// Read the latest tag from `dist-tags`
	const {latest} = body['dist-tags'];

	if (latest === pkg.version) {
		return;
	}

	return latest;
};
