# @tsd/typescript ![CI](https://github.com/SamVerschueren/tsd-typescript/workflows/CI/badge.svg)

> TypeScript with some extras for type-checking.


## Install

```
npm install --save-dev @tsd/typescript
```


## Usage

This package is just TypeScript with some private methods exposed that [tsd](https://github.com/SamVerschueren/tsd) needs for enhanced type checking.

- `isTypeAssignableTo(a: Type, b: Type)`: Check if type `a` is assignable to type `b`.
- `isTypeIdenticalTo(a: Type, b: Type)`: Check if two types are identical to each other. [More info...](https://github.com/microsoft/TypeScript/blob/v4.1.2/doc/spec-ARCHIVED.md#3.11.2)


## Related

- [tsd](https://github.com/SamVerschueren/tsd) - Check TypeScript type definitions
