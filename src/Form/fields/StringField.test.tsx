import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import StringField from './StringField';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<StringField/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<StringField schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot for defined schema format', () => {
      const wrapper = shallow(<StringField schema={{format: 'ipv4'}} />);

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('get value', () => {
    it('should calls get value on ref element', () => {
      const wrapper = shallow(<StringField schema={{}} />);
      const instance = wrapper.instance() as StringField;

      instance.field = {value: 'foo'};

      instance.value.should.equal('foo');
    });
  });

  describe('get isValid', () => {
    it('should calls get isValid on ref element', () => {
      const wrapper = shallow(<StringField schema={{}} />);
      const instance = wrapper.instance() as StringField;

      instance.field = {isValid: true};

      instance.isValid.should.equal(true);
    });
  });
});
