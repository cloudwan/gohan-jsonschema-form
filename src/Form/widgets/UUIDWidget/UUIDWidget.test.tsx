import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import InputSearch from './components/InputSearch';
import UUIDWidget from './UUIDWidget';

chai.use(chaiEnzyme());
chai.should();

const should = chai.should();

describe('<UUIDWidget />', () => {
  describe('render', () => {
    it('should match snapshot when schema type is string', () => {
      const wrapper = shallow(<UUIDWidget schema={{type: ['string']}} />);

      wrapper.should.to.matchSnapshot();
    });

    it('should set state value when it is passed by props', () => {
      const wrapper = shallow(
        <UUIDWidget schema={{type: ['string']}} value={'foo'} />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should set state value to null when null is passed by props', () => {
      const wrapper = shallow(
        <UUIDWidget schema={{type: ['string', 'null']}} value={null} />,
      );

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('handleChange', () => {
    it('should have been called and changed state value', () => {
      const wrapper = shallow(<UUIDWidget schema={{type: ['string']}} />);
      const event = {target: {value: 'test'}};

      wrapper.find(InputSearch).simulate('change', event);
      wrapper.state().value.should.equal('test');
    });
  });

  describe('handleGenerateUUID', () => {
    it('should have been called and changed state value when button is clicked', () => {
      const wrapper = shallow(<UUIDWidget schema={{type: ['string']}} />);

      wrapper.instance().handleGenerateUUID();
      should.not.equal(wrapper.state().value, undefined);
    });
  });
});
