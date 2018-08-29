import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import CheckboxWidget from './CheckboxWidget';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<CheckboxWidget/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<CheckboxWidget schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('get value', () => {
    it('should calls get value on ref element', () => {
      const wrapper = shallow(<CheckboxWidget schema={{}} />);
      const instance = wrapper.instance() as CheckboxWidget;

      instance.value.should.equal(false);
    });
  });

  describe('handleChangeCheckbox', () => {
    it('should calls get value on ref element', () => {
      const wrapper = shallow(<CheckboxWidget schema={{}} />);
      const instance = wrapper.instance() as CheckboxWidget;
      const event = {target: {checked: true}};

      instance.handleChangeCheckbox(event);

      wrapper.state().checked.should.equal(true);
    });
  });
});
