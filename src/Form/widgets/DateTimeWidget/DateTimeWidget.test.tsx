import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import moment from 'moment';
import * as React from 'react';

import DateTimeWidget from './DateTimeWidget';

chai.use(chaiEnzyme());
chai.should();

const should = chai.should();

describe('<DateTimeWidget />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <DateTimeWidget
        schema={{
          type: ['string'],
        }}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot when widget has default value', () => {
    const wrapper = shallow(
      <DateTimeWidget
        schema={{
          type: ['string'],
          default: '2018-09-07T18:10:48Z',
        }}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot when value is null', () => {
    const wrapper = shallow(
      <DateTimeWidget
        schema={{
          type: ['string', 'null'],
        }}
        value={null}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  describe('get value', () => {
    it('should return value when it is valid', () => {
      const wrapper = shallow(
        <DateTimeWidget
          schema={{
            type: ['string'],
          }}
        />,
      );
      const instance = wrapper.instance() as DateTimeWidget;
      const value = moment('2018-09-07T18:10:48Z');
      wrapper.setState({value});

      instance.value.should.equal(value.format());
    });

    it('should return undefined when there is no value', () => {
      const wrapper = shallow(
        <DateTimeWidget
          schema={{
            type: ['string'],
          }}
        />,
      );
      const instance = wrapper.instance() as DateTimeWidget;

      should.equal(instance.value, undefined);
    });

    it('should return null when type includes null and value was removed', () => {
      const wrapper = shallow(
        <DateTimeWidget
          schema={{
            type: ['string', 'null'],
          }}
          value={'2018-09-07T18:10:48Z'}
        />,
      );
      const instance = wrapper.instance() as DateTimeWidget;
      wrapper.setState({value: null});

      should.equal(instance.value, null);
    });
  });

  describe('get isValid', () => {
    it('should return true when value is valid', () => {
      const wrapper = shallow(
        <DateTimeWidget
          schema={{
            type: ['string'],
            format: 'date-time',
          }}
          value={'2018-09-07T18:10:48Z'}
        />,
      );
      const instance = wrapper.instance() as DateTimeWidget;

      instance.isValid.should.equal(true);
    });

    it('should return false when there is no value and it is required', () => {
      const wrapper = shallow(
        <DateTimeWidget
          schema={{
            type: ['string'],
            format: 'date-time',
          }}
          isRequired={true}
        />,
      );
      const instance = wrapper.instance() as DateTimeWidget;

      instance.isValid.should.equal(false);
    });
  });

  describe('handleInputChange', () => {
    it('should change state value', () => {
      const wrapper = shallow(
        <DateTimeWidget
          schema={{
            type: ['string'],
          }}
          value={'2018-09-07T18:10:48Z'}
        />,
      );

      const instance = wrapper.instance() as DateTimeWidget;
      const value = moment('2018-09-07T18:10:48Z');
      instance.handleInputChange(value);

      wrapper.state().value.should.deep.equal(value);
    });
  });

  describe('handleSubmitClick', () => {
    it('should change state value', () => {
      const wrapper = shallow(
        <DateTimeWidget
          schema={{
            type: ['string'],
          }}
          value={'2018-09-07T18:10:48Z'}
        />,
      );

      const instance = wrapper.instance() as DateTimeWidget;
      const value = moment('2018-09-07T18:10:48Z');
      instance.handleSubmitClick(value);

      wrapper.state().value.should.deep.equal(value);
    });
  });
});
