import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';

import PasswordConfirmWidget from './PasswordConfirmWidget';
import SchemaField from '../../fields/SchemaField';

chai.use(chaiEnzyme());
chai.should();

const should = chai.should();

describe('<PasswordConfirmWidget />', () => {
  describe('get value', () => {
    it('should return correct value', () => {
      const wrapper = mount(
        <PasswordConfirmWidget
          schema={{
            description: 'Password with confirm.',
            title: 'Password',
            type: 'string',
            format: 'password-confirm',
          }}
        />,
      );

      const instance = wrapper.instance() as SchemaField;

      instance.fieldA = {value: 'foo'};
      instance.fieldB = {value: 'foo'};
      instance.value.should.equal('foo');
    });

    it('should throw error for not matched fields values ', () => {
      const wrapper = mount(
        <PasswordConfirmWidget
          schema={{
            description: 'Password with confirm.',
            title: 'Password',
            type: 'string',
            format: 'password-confirm',
          }}
        />,
      );

      const instance = wrapper.instance() as SchemaField;

      instance.fieldA = {value: 'foo'};
      instance.fieldB = {value: 'bar'};

      should.throw(() => instance.value, Error);
    });
  });

  describe('get isValid', () => {
    it('should return false for invalid field', () => {
      const wrapper = mount(
        <PasswordConfirmWidget
          schema={{
            description: 'Password with confirm.',
            title: 'Password',
            type: 'string',
            format: 'password-confirm',
          }}
        />,
      );

      const instance = wrapper.instance() as SchemaField;

      instance.fieldA = {isValid: true};
      instance.fieldB = {isValid: false};
      instance.isValid.should.equal(false);
    });

    it('should return false for not matched fields values', () => {
      const wrapper = mount(
        <PasswordConfirmWidget
          schema={{
            description: 'Password with confirm.',
            title: 'Password',
            type: 'string',
            format: 'password-confirm',
          }}
        />,
      );

      const instance = wrapper.instance() as SchemaField;

      instance.fieldA = {value: 'Foo'};
      instance.fieldB = {value: 'bar'};
      instance.isValid.should.equal(false);
    });
  });

  describe('render', () => {
    it('should match snapshot with only required props', () => {
      const wrapper = shallow(
        <PasswordConfirmWidget
          schema={{
            description: 'Password with confirm.',
            title: 'Password',
            type: 'string',
            format: 'password-confirm',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
