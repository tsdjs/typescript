'use strict';

/**
 * List of replacements per file.
 */
module.exports = {
	"lib/typescript.js": [
		{
			/**
			 * ([^\n]+): Match all characters expect \n before `var checker`.
			 * (.*?): Match everything between `var checker = {` and `getNodeCount`
			 */
			from: /([^\n]+)var checker = {\n(.*?)getNodeCount:/gms,
			to: `
				$1var checker = {
				$1	/** TSD */
				$1	isTypeIdendticalTo: isTypeIdenticalTo,
				$1	isTypeAssignableTo: isTypeAssignableTo,
				$1	/** TSD */
				$2getNodeCount:
			`
		}
	],
	"lib/typescript.d.ts": [
		{
			from: 'export = ts;',
			to: `
				/** TSD */
				declare namespace ts {
					/**
					 * Custom interface for the TypeScript \`TypeChecker\` interface. This exports extra methods that we need
					 * inside \`tsd\`. Use this entity in favour of \`ts.TypeChecker\`.
					 */
					export interface TypeChecker {
						/**
						 * Checks if type \`a\` is assignable to type \`b\`.
						 */
						isTypeAssignableTo(a: Type, b: Type): boolean;

						/**
						 * Two types are considered identical when
						 *  - they are both the \`any\` type,
						 *  - they are the same primitive type,
						 *  - they are the same type parameter,
						 *  - they are union types with identical sets of constituent types, or
						 *  - they are intersection types with identical sets of constituent types, or
						 *  - they are object types with identical sets of members.
						 *
						 * This relationship is bidirectional.
						 * See [here](https://github.com/microsoft/TypeScript/blob/v4.1.2/doc/spec-ARCHIVED.md#3.11.2) for more information.
						 */
						isTypeIdenticalTo(a: Type, b: Type): boolean;
					}
				}
				/** END TSD */

				export = ts;
			`
		}
	]
};
