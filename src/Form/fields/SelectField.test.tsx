import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import SelectField from './SelectField';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<SelectField/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<SelectField schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('get value', () => {
    it('should calls get value on ref element', () => {
      const wrapper = shallow(<SelectField schema={{}} />);
      const instance = wrapper.instance() as SelectField;

      instance.field = {value: 'foo'};

      instance.value.should.equal('foo');
    });
  });

  describe('get isValid', () => {
    it('should calls get isValid on ref element', () => {
      const wrapper = shallow(<SelectField schema={{}} />);
      const instance = wrapper.instance() as SelectField;

      instance.field = {isValid: true};

      instance.isValid.should.equal(true);
    });
  });
});
