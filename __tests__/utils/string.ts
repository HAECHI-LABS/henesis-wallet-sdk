import BN from 'bn.js';
import { toSnakeCase, toCamelCase } from '../../src/utils/string';

describe('string', () => {
  describe('#toSnakeCase', () => {
    it('should make toSnakeCase', () => {
      expect(toSnakeCase('toSnakeCase')).toEqual('to_snake_case');
      expect(toSnakeCase('to_snake_case')).toEqual('to_snake_case');
      expect(toSnakeCase('tosnakecase')).toEqual('tocamelcase');
    });

    it('should make toCamelCase', () => {
      expect(toSnakeCase('to_camel_case')).toEqual('toCamelCase');
      expect(toSnakeCase('toCamelCase')).toEqual('toCamelCase');
      expect(toSnakeCase('tocamelcase')).toEqual('tocamelcase');
    });
  });
});
