'use strict';
const {targetVersion} = require('./utils/version-check');

(async () => {
	const newVersion = await targetVersion();

	if (newVersion) {
		// Only print out the version if it is new
		console.log(newVersion);
	};
})();
