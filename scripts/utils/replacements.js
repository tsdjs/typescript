'use strict';

/**
 * List of replacements per file.
 */
module.exports = {
	'lib/typescript.js': [
		{
			/**
			 * ([^\n]+): Match all characters expect \n before `var checker`.
			 * (.*?): Match everything between `var checker = {` and `getNodeCount`
			 */
			from: /([^\n]+)var checker = {\r?\n(.*?)getNodeCount:/gms,
			to: `
				$1var checker = {
				$1	/** TSD */
				$1	isTypeIdenticalTo: isTypeIdenticalTo,
				$1	isTypeSubtypeOf: isTypeSubtypeOf,
				$1	isTypeAssignableTo: isTypeAssignableTo,
				$1	isTypeDerivedFrom: isTypeDerivedFrom,
				$1	isTypeComparableTo: isTypeComparableTo,
				$1	areTypesComparable: areTypesComparable,
				$1	/** END TSD */
				$2getNodeCount:
			`
		}
	],
	'lib/typescript.d.ts': [
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
						isTypeIdenticalTo(source: Type, target: Type): boolean;

						/**
						 * S is a subtype of a type T, and T is a supertype of S, if S has no excess properties with respect
						 * to T ([3.11.5](https://github.com/microsoft/TypeScript/blob/v4.1.2/doc/spec-ARCHIVED.md#3.11.5)) and one
						 * of the following is true https://github.com/microsoft/TypeScript/blob/v4.1.2/doc/spec-ARCHIVED.md#3.11.3.
						 */
						isTypeSubtypeOf(source: Type, target: Type): boolean;

						/**
						 * Checks if type \`a\` is assignable to type \`b\`.
						 */
						isTypeAssignableTo(source: Type, target: Type): boolean;

						/**
						 * An object type S is considered to be derived from an object type T if
						 *  - S is a union type and every constituent of S is derived from T,
						 *  - T is a union type and S is derived from at least one constituent of T, or
						 *  - S is a type variable with a base constraint that is derived from T,
						 *  - T is one of the global types Object and Function and S is a subtype of T, or
						 *  - T occurs directly or indirectly in an 'extends' clause of S.
						 *
						 * Note that this check ignores type parameters and only considers the inheritance hierarchy.
						 */
						isTypeDerivedFrom(source: Type, target: Type): boolean;

						/**
						 * This is *not* a bi-directional relationship.
						 * If one needs to check both directions for comparability, use a second call to this function or 'areTypesComparable'.
						 *
						 * A type S is comparable to a type T if some (but not necessarily all) of the possible values of S are also possible values of T.
						 * It is used to check following cases:
						 *  - the types of the left and right sides of equality/inequality operators (\`===\`, \`!==\`, \`==\`, \`!=\`).
						 *  - the types of \`case\` clause expressions and their respective \`switch\` expressions.
						 *  - the type of an expression in a type assertion with the type being asserted.
						 */
						isTypeComparableTo(source: Type, target: Type): boolean;

						/**
						 * This is a bi-directional relationship.
						 * If one needs to check one direction for comparability, use 'isTypeComparableTo'.
						 *
						 * A type S is comparable to a type T if some (but not necessarily all) of the possible values of S are also possible values of T.
						 * It is used to check following cases:
						 *  - the types of the left and right sides of equality/inequality operators (\`===\`, \`!==\`, \`==\`, \`!=\`).
						 *  - the types of \`case\` clause expressions and their respective \`switch\` expressions.
						 *  - the type of an expression in a type assertion with the type being asserted.
						 */
						areTypesComparable(source: Type, target: Type): boolean;
					}
				}
				/** END TSD */

				export = ts;
			`
		}
	]
};
