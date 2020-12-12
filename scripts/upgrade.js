'use strict';
const fs = require('fs');
const path = require('path');
const got = require('got').default;
const makeDir = require('make-dir');
const tar = require('tar-stream');
const gunzip = require('gunzip-maybe');
const redent = require('redent');
const replacements = require('./utils/replacements');
const {targetVersion} = require('./utils/version-check');

const replacementMap = new Map(Object.entries(replacements));

const upgrade = async (version) => {
	return new Promise((resolve, reject) => {
		// Download the tgz archive
		got.stream(`https://registry.npmjs.org/typescript/-/typescript-${version}.tgz`)
			.pipe(gunzip())
			.pipe(tar.extract())
			.on('entry', (header, stream, next) => {
				const chunks = [];

				stream.on('data', chunk => {
					// Put all data chunks in an array.
					chunks.push(chunk);
				});

				stream.on('end', () => {
					const filename = path.relative('package', header.name)
					const filePath = path.join(process.cwd(), 'typescript', filename);

					// Concat all chunks and convert to utf8.
					let fileContents = Buffer.concat(chunks).toString('utf8');

					// Make sure the directory exists before we write the file.
					makeDir.sync(path.dirname(filePath));

					// If the filename is present in the `replacementMap`, start replacing.
					if (replacementMap.has(filename)) {
						const replacementsList = replacementMap.get(filename);

						for (const replacement of replacementsList) {
							// Strip of newlines at the beginning and end of the replacement
							const to = replacement.to.replace(/(^\n)|(\n\s*?$)/g, '')

							fileContents = fileContents.replace(replacement.from, redent(to));
						}
					}

					// Write the file to disk
					fs.writeFileSync(filePath, fileContents, 'utf8');

					next();
				});
			})
			.on('finish', resolve)
			.on('error', reject);
	});
};

(async () => {
	// Use the version provided, or retrieve the latest version
	const version = process.argv[2] || await targetVersion();

	if (!version) {
		// If no version was returned, we don't have to do anything
		console.log('Everything is up-to-date');

		return;
	}

	console.log(`New version TypeScript@${version} detected`);

	await upgrade(version);

	console.log(`Upgraded to TypeScript@${version}`);
})();
