import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Switch from './components/Switch';
import SwitchWidget from './SwitchWidget';

chai.use(chaiEnzyme);
chai.should();

const should = chai.should();

describe('<SwitchWidget />', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<SwitchWidget schema={{type: ['boolean']}} />);

      wrapper.should.to.matchSnapshot();
    });

    it('should set state value to default', () => {
      const wrapper = shallow(
        <SwitchWidget schema={{type: ['boolean'], default: true}} />,
      );

      should.equal(wrapper.state().value, true);
    });

    it('should set state value when it is passed by props', () => {
      const wrapper = shallow(
        <SwitchWidget schema={{type: ['boolean']}} value={true} />,
      );

      should.equal(wrapper.state().value, true);
    });
  });

  describe('get value', () => {
    it('should return value when it is valid', () => {
      const wrapper = shallow(
        <SwitchWidget schema={{type: ['boolean']}} value={true} />,
      );

      const instance = wrapper.instance() as SwitchWidget;

      wrapper.setState({value: true});
      instance.value.should.equal(true);
    });
  });

  describe('get isValid', () => {
    it('should be true if value is valid', () => {
      const wrapper = shallow(
        <SwitchWidget schema={{type: ['boolean']}} value={true} />,
      );

      const instance = wrapper.instance() as SwitchWidget;
      wrapper.setState({value: true});
      instance.isValid.should.equal(true);
    });

    it('should be true if value is valid', () => {
      const wrapper = shallow(
        <SwitchWidget schema={{type: ['boolean']}} value={true} />,
      );

      const instance = wrapper.instance() as SwitchWidget;
      wrapper.setState({value: true});
      instance.isValid.should.equal(true);
    });

    it('should be false if value is invalid', () => {
      const wrapper = shallow(<SwitchWidget schema={{type: ['boolean']}} />);

      const instance = wrapper.instance() as SwitchWidget;
      wrapper.setState({value: ''});
      instance.isValid.should.equal(false);
    });

    it('should be false when value is undefined and it is required', () => {
      const wrapper = shallow(
        <SwitchWidget schema={{type: ['boolean']}} isRequired={true} />,
      );

      const instance = wrapper.instance() as SwitchWidget;
      instance.isValid.should.equal(false);
    });
  });

  describe('handleChange', () => {
    it('should have been called and changed state value', () => {
      const wrapper = shallow(<SwitchWidget schema={{type: ['boolean']}} />);
      wrapper.find(Switch).simulate('change', true);
      wrapper.state().value.should.equal(true);
    });
  });
});
