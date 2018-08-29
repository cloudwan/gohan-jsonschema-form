import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import BooleanField from './BooleanField';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<BooleanField/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<BooleanField schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('get value', () => {
    it('should calls get value on ref element', () => {
      const wrapper = shallow(<BooleanField schema={{}} />);
      const instance = wrapper.instance() as BooleanField;

      instance.field = {value: true};

      instance.value.should.equal(true);
    });
  });

  describe('get isValid', () => {
    it('should calls get isValid on ref element', () => {
      const wrapper = shallow(<BooleanField schema={{}} />);
      const instance = wrapper.instance() as BooleanField;

      instance.field = {isValid: true};

      instance.isValid.should.equal(true);
    });
  });
});
