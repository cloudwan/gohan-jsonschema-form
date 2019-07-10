import * as chai from 'chai';
import * as sinon from 'sinon';

import {
  getArrayTypeValue,
  getFieldValue,
  getInitialValues,
  getObjectTypeValue,
  getSimpleTypeValue,
  matchValue,
} from './utils';

const should = chai.should();

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

  describe('getInitialValues', () => {
    it('should return empty object for no schema', () => {
      getInitialValues(undefined, undefined).should.deep.equal({});
    });

    it('should return empty object for empty schema', () => {
      getInitialValues({}, undefined).should.deep.equal({});
    });

    it('should call getSimpleTypeValue for string type', () => {
      const spy = sinon.spy();

      getInitialValues({type: 'string'}, undefined, undefined, spy);

      spy
        .calledOnceWithExactly({type: 'string'}, undefined, false)
        .should.equal(true);
    });

    it('should call getSimpleTypeValue for number type', () => {
      const spy = sinon.spy();

      getInitialValues({type: 'number'}, undefined, undefined, spy);

      spy
        .calledOnceWithExactly({type: 'number'}, undefined, false)
        .should.equal(true);
    });

    it('should call getSimpleTypeValue for integer type', () => {
      const spy = sinon.spy();

      getInitialValues({type: 'integer'}, undefined, undefined, spy);

      spy
        .calledOnceWithExactly({type: 'integer'}, undefined, false)
        .should.equal(true);
    });

    it('should call getSimpleTypeValue for boolean type', () => {
      const spy = sinon.spy();

      getInitialValues({type: 'boolean'}, undefined, undefined, spy);

      spy
        .calledOnceWithExactly({type: 'boolean'}, undefined, false)
        .should.equal(true);
    });

    it('should call getSimpleTypeValue for string type and pass value', () => {
      const spy = sinon.spy();

      getInitialValues({type: 'string'}, 'test', undefined, spy);

      spy
        .calledOnceWithExactly({type: 'string'}, 'test', true)
        .should.equal(true);
    });

    it('should call getSimpleTypeValue for string and null type', () => {
      const spy = sinon.spy();

      getInitialValues({type: ['string', 'null']}, undefined, undefined, spy);

      spy
        .calledOnceWithExactly({type: ['string', 'null']}, undefined, false)
        .should.equal(true);
    });

    it('should call getArrayValue for array type value', () => {
      const spy = sinon.spy();

      getInitialValues({type: 'array'}, undefined, undefined, undefined, spy);

      spy
        .calledOnceWithExactly({type: 'array'}, undefined, false)
        .should.equal(true);
    });

    it('should call getObjectTypeValue for object type value', () => {
      const spy = sinon.spy();

      getInitialValues(
        {type: 'object'},
        undefined,
        undefined,
        undefined,
        undefined,
        spy,
      );

      spy
        .calledOnceWithExactly({type: 'object'}, undefined, false)
        .should.equal(true);
    });

    it('should call getObjectTypeValue for object type with default value', () => {
      const spy = sinon.spy();

      getInitialValues(
        {type: 'object', default: {}},
        undefined,
        undefined,
        undefined,
        undefined,
        spy,
      );

      spy
        .calledOnceWithExactly({type: 'object', default: {}}, {}, false)
        .should.equal(true);
    });
  });

  describe('getSimpleTypeValue', () => {
    it('should return value', () => {
      getSimpleTypeValue({type: 'string'}, 'foo').should.equal('foo');
    });

    it('should return default value', () => {
      getSimpleTypeValue({type: 'string', default: 'foo'}).should.equal('foo');
    });

    it('should return undefined for no value', () => {
      should.equal(getSimpleTypeValue({type: 'string'}), undefined);
    });

    it('should return undefined', () => {
      should.equal(
        getSimpleTypeValue({type: 'string', default: 'foo'}, undefined, true),
        undefined,
      );
    });
  });

  describe('getArrayTypeValue', () => {
    it('should return value', () => {
      getArrayTypeValue(
        {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        ['foo'],
      ).should.deep.equal(['foo']);
    });

    it('should return value when items property is an object', () => {
      getArrayTypeValue(
        {
          type: 'array',
          items: {
            type: 'number',
          },
        },
        [1, 2],
      ).should.deep.equal([1, 2]);
    });

    it('should return value when items property is an array', () => {
      getArrayTypeValue(
        {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        ['foo', 1],
      ).should.deep.equal(['foo', 1]);
    });

    it('should return null', () => {
      should.equal(
        getArrayTypeValue(
          {
            type: ['array', 'null'],
            items: {
              type: 'string',
            },
          },
          null,
        ),
        null,
      );
    });

    it('should return default value', () => {
      getArrayTypeValue({
        type: 'array',
        default: ['foo'],
        items: {
          type: 'string',
        },
      }).should.deep.equal(['foo']);
    });

    it("should return empty array when form has data but field doesn't", () => {
      getArrayTypeValue({type: 'array'}, undefined, true).should.deep.equal([]);
    });

    it("should return empty array when schema doesn't have items", () => {
      getArrayTypeValue({type: 'array'}).should.deep.equal([]);
    });

    it('should return array of default values', () => {
      getArrayTypeValue(
        {
          type: 'array',
          items: [
            {
              type: 'string',
              default: 'foo',
            },
            {
              type: 'number',
              default: 0,
            },
          ],
        },
        undefined,
      ).should.deep.equal(['foo', 0]);
    });

    it('should return array of one items with default values', () => {
      getArrayTypeValue(
        {
          type: 'array',
          items: {
            type: 'string',
            default: 'foo',
          },
        },
        undefined,
      ).should.deep.equal(['foo']);
    });

    it('should return default array', () => {
      getArrayTypeValue(
        {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                default: '1',
              },
              name: {
                type: 'string',
              },
              size: {
                type: 'object',
                properties: {
                  width: {
                    type: 'number',
                  },
                  height: {
                    type: 'number',
                  },
                },
              },
            },
          },
          default: [{name: 'foo', size: {width: 100}}],
        },
        undefined,
      ).should.deep.equal([
        {
          id: '1',
          name: 'foo',
          size: {
            width: 100,
            height: undefined,
          },
        },
      ]);
    });
  });

  describe('getObjectTypeValue', () => {
    it('should return empty object for schema without properties', () => {
      getObjectTypeValue({}, undefined).should.deep.equal({});
    });

    it('should return object with default values', () => {
      getObjectTypeValue(
        {
          properties: {
            id: {
              type: 'string',
              default: '1',
            },
            name: {
              type: 'string',
            },
          },
          type: 'object',
        },
        undefined,
      ).should.deep.equal({
        id: '1',
        name: undefined,
      });
    });

    it('should return null', () => {
      should.equal(
        getObjectTypeValue(
          {
            properties: {
              id: {
                type: 'string',
                default: '1',
              },
              name: {
                type: 'string',
              },
            },
            type: ['object', 'null'],
          },
          undefined,
        ),
        null,
      );
    });

    it('should return object with received values', () => {
      getObjectTypeValue(
        {
          properties: {
            id: {
              type: 'string',
              default: '1',
            },
            name: {
              type: 'string',
            },
            value: {
              type: ['number', 'null'],
            },
          },
          type: 'object',
        },
        {
          name: 'foo',
          value: null,
        },
        true,
      ).should.deep.equal({
        id: undefined,
        name: 'foo',
        value: null,
      });
    });
  });
});
