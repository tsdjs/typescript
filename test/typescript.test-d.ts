import {expectType} from 'tsd';
import {TypeChecker, Type} from '..';

let typeChecker = {} as TypeChecker;

let aType = {} as Type;
let bType = {} as Type;

expectType<(a: Type, b: Type) => boolean>(typeChecker.isTypeAssignableTo);
expectType<(a: Type, b: Type) => boolean>(typeChecker.isTypeIdenticalTo);

expectType<boolean>(typeChecker.isTypeAssignableTo(aType, bType));
expectType<boolean>(typeChecker.isTypeIdenticalTo(aType, bType));
