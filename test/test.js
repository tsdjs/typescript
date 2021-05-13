'use strict';
const test = require('ava');
const {createProgram} = require('..');

const typeChecker = createProgram([], {}).getTypeChecker();

function macro(t, method) {
	t.true(typeof typeChecker[method] === 'function');
}

macro.title = (_, method) => method;

test(macro, 'isTypeIdenticalTo');
test(macro, 'isTypeSubtypeOf');
test(macro, 'isTypeAssignableTo');
test(macro, 'isTypeDerivedFrom');
test(macro, 'isTypeComparableTo');
test(macro, 'areTypesComparable');
