import BN from 'bn.js';
import { toSnakeCase, toCamelCase } from '../../src/utils/string';

describe('string.spec.ts', () => {
  describe('#toSnakeCase', () => {
    it('should make toSnakeCase', () => {
      expect(toSnakeCase('toSnakeCase')).toEqual('to_snake_case');
      expect(toSnakeCase('to_snake_case')).toEqual('to_snake_case');
      expect(toSnakeCase('tosnakecase')).toEqual('tosnakecase');
    });

    it('should make toCamelCase', () => {
      expect(toCamelCase('to_camel_case')).toEqual('toCamelCase');
      expect(toCamelCase('toCamelCase')).toEqual('toCamelCase');
      expect(toCamelCase('tocamelcase')).toEqual('tocamelcase');
    });
  });
});
