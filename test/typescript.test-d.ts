import { expectType } from 'tsd';
import { TypeChecker, Type } from '..';

let typeChecker = {} as TypeChecker;

let aType = {} as Type;
let bType = {} as Type;

expectType<(a: Type, b: Type) => boolean>(typeChecker.isTypeIdenticalTo);
expectType<(a: Type, b: Type) => boolean>(typeChecker.isTypeSubtypeOf);
expectType<(a: Type, b: Type) => boolean>(typeChecker.isTypeAssignableTo);
expectType<(a: Type, b: Type) => boolean>(typeChecker.isTypeDerivedFrom);
expectType<(a: Type, b: Type) => boolean>(typeChecker.isTypeComparableTo);
expectType<(a: Type, b: Type) => boolean>(typeChecker.areTypesComparable);

expectType<boolean>(typeChecker.isTypeIdenticalTo(aType, bType));
expectType<boolean>(typeChecker.isTypeSubtypeOf(aType, bType));
expectType<boolean>(typeChecker.isTypeAssignableTo(aType, bType));
expectType<boolean>(typeChecker.isTypeDerivedFrom(aType, bType));
expectType<boolean>(typeChecker.isTypeComparableTo(aType, bType));
expectType<boolean>(typeChecker.areTypesComparable(aType, bType));
