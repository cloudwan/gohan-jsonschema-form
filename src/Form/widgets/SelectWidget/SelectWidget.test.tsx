import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import Select from './components/Select';
import SelectWidget from './SelectWidget';

chai.use(chaiEnzyme());
chai.should();

const should = chai.should();

describe('<SelectWidget />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <SelectWidget schema={{type: ['string'], enum: ['foo', 'bar', 'baz']}} />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should set state value when it is passed by props', () => {
    const wrapper = shallow(
      <SelectWidget
        schema={{type: ['string'], enum: ['foo', 'bar', 'baz']}}
        value="foo"
      />,
    );

    should.equal(wrapper.state().value, 'foo');
  });

  it('should set state value to null when null is passed by props', () => {
    const wrapper = shallow(
      <SelectWidget
        schema={{type: ['string', 'null'], enum: ['foo', 'bar', 'baz', null]}}
        value={null}
      />,
    );

    should.equal(wrapper.state().value, null);
  });

  describe('get method', () => {
    it('should return value when it is valid', () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{type: ['string'], enum: ['foo', 'bar', 'baz']}}
        />,
      );
      const instance = wrapper.instance() as SelectWidget;

      wrapper.setState({value: 'foo'});
      instance.value.should.equal('foo');
    });

    it('should return null when input was cleared and it includes type null', () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{type: ['string', 'null'], enum: ['foo', 'bar', 'baz']}}
          value="foo"
        />,
      );
      const instance = wrapper.instance() as SelectWidget;
      wrapper.setState({value: ''});
      should.equal(instance.value, null);
    });
  });

  describe('isValid method', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
      wrapper = shallow(
        <SelectWidget
          schema={{type: ['string'], enum: ['foo', 'bar', 'baz']}}
        />,
      );
      instance = wrapper.instance() as SelectWidget;
    });

    const testIsValid = (value, expected, isRequired = false) => {
      wrapper.setProps({isRequired});
      wrapper.setState({value});
      instance.isValid.should.equal(expected);
    };

    // it('should be true for initial value', () => {
    //   testIsValid(undefined, true);
    // });

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

  describe('handleChangeInput', () => {
    it('should have been called and changed state value', () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{type: ['string'], enum: ['foo', 'bar', 'baz']}}
        />,
      );
      wrapper.find(Select).simulate('change', 'foo');
      wrapper.state().value.should.equal('foo');
    });
  });

  describe('render method', () => {
    it('should render elements for multiple choice select', () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{
            type: ['array'],
            items: {
              type: ['string'],
              enum: ['foo', 'bar', 'baz'],
            },
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should render elements with custom labels', () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{
            type: ['array'],
            items: {
              type: ['string'],
              enum: ['foo', 'bar', 'baz'],
              options: {
                foo: 'test 1',
                bar: 'test 2',
                baz: 'test 3',
              },
            },
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
