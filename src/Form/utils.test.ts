import * as chai from 'chai';

import {matchValue, getFieldValue} from './utils';

chai.should();

describe('utils', () => {
  describe('matchValue', () => {
    it('should return true when value matches regex', () => {
      const isMatched = matchValue('foo', RegExp('^(foo)$', 'g'));

      isMatched.should.equal(true);
    });

    it("should return false when value doesn't match regex", () => {
      const isMatched = matchValue('foo', RegExp('^(bar)$', 'g'));

      isMatched.should.equal(false);
    });

    it('should return true when value is array and one element matches regex', () => {
      const isMatched = matchValue(
        ['foo', 'bar', 'baz'],
        RegExp('^(bar)$', 'g'),
      );

      isMatched.should.equal(true);
    });

    it('should return false when value is array and none of elements matches regex', () => {
      const isMatched = matchValue(
        ['foo', 'bar', 'baz'],
        RegExp('^(faz)$', 'g'),
      );

      isMatched.should.equal(false);
    });

    it('should return false when value is an object', () => {
      const isMatched = matchValue({foo: 'bar'}, RegExp('^(faz)$', 'g'));

      isMatched.should.equal(false);
    });
  });

  describe('getFieldValue', () => {
    const values = {
      prop1: {
        prop2: {
          prop3: 'foo',
          prop4: 'bar',
        },
      },
    };

    const getValue = (valuesObject, source) => {
      const path = source.split('.');
      return path.reduce((result, key) => {
        return result[key];
      }, valuesObject);
    };

    it('should return field value for absolute source path', () => {
      const value = getFieldValue('prop1.prop2.prop4', '', values, getValue);

      value.should.equal('bar');
    });

    it('should return field value for relative source path', () => {
      const value = getFieldValue(
        '.prop3',
        'prop1.prop2.prop4',
        values,
        getValue,
      );

      value.should.equal('foo');
    });
  });
});
