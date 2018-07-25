import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Input from './components/Input';
import InputNumber from './components/InputNumber';
import InputWidget from './InputWidget';

chai.use(chaiEnzyme());
chai.should();

const should = chai.should();

describe('<InputWidget />', () => {
  it('should match snapshot when schema type is string', () => {
    const wrapper = shallow(<InputWidget schema={{type: ['string']}} />);

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot when schema type is number', () => {
    const wrapper = shallow(<InputWidget schema={{type: ['number']}} />);

    wrapper.should.to.matchSnapshot();
  });

  it('should set state value when it is passed by props', () => {
    const wrapper = shallow(
      <InputWidget schema={{type: ['string']}} value={'foo'} />,
    );
    const instance = wrapper.instance() as InputWidget;
    should.equal(wrapper.state().value, 'foo');
  });

  it('should set state value to null when null is passed by props', () => {
    const wrapper = shallow(
      <InputWidget schema={{type: ['string', 'null']}} value={null} />,
    );
    const instance = wrapper.instance() as InputWidget;
    should.equal(wrapper.state().value, null);
  });

  describe('get method', () => {
    it('should return value when it is valid', () => {
      const wrapper = shallow(<InputWidget schema={{type: ['string']}} />);
      const instance = wrapper.instance() as InputWidget;
      wrapper.setState({value: 'foo'});
      instance.value.should.equal('foo');
    });

    it('should return null when input was cleared and it includes type null', () => {
      const wrapper = shallow(
        <InputWidget schema={{type: ['string', 'null']}} />,
      );
      const instance = wrapper.instance() as InputWidget;
      wrapper.setState({value: ''});
      should.equal(instance.value, null);
    });
  });

  describe('isValid method', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
      wrapper = shallow(<InputWidget schema={{type: ['string']}} />);
      instance = wrapper.instance() as InputWidget;
    });

    const testIsValid = (value, expected, required = false) => {
      wrapper.setProps({required});
      wrapper.setState({value});
      instance.isValid.should.equal(expected);
    };

    it('should be true for initial value', () => {
      testIsValid(undefined, true);
    });

    it('should be true if value is valid', () => {
      testIsValid('foo', true);
    });

    it('should be false if value is invalid', () => {
      testIsValid(0, false);
    });

    it('should be false when input was cleared and value is required', () => {
      testIsValid('', false, true);
    });
  });

  describe('render method', () => {
    it('should render elements', () => {
      const wrapper = shallow(<InputWidget schema={{type: ['string']}} />);
      wrapper.should.not.equal(undefined);
    });
  });

  describe('handleChangeInput', () => {
    it('should have been called and changed state value', () => {
      const wrapper = shallow(<InputWidget schema={{type: ['string']}} />);
      wrapper.find(Input).simulate('change', {target: {value: 'foo'}});
      wrapper.state().value.should.equal('foo');
    });
  });

  describe('handleChangeInputNumber', () => {
    it('should have been called and changed state value', () => {
      const wrapper = shallow(<InputWidget schema={{type: ['number']}} />);
      wrapper.find(InputNumber).simulate('change', 1);
      wrapper.state().value.should.equal(1);
    });

    it('should have been called and changed state value to null when input is cleared', () => {
      const wrapper = shallow(<InputWidget schema={{type: ['number']}} />);
      wrapper.find(InputNumber).simulate('change', undefined);
      should.equal(wrapper.state().value, null);
    });
  });
});
