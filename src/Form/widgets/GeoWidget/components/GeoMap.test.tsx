import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';

import GeoMap from './GeoMap';

chai.use(sinonChai);
chai.use(chaiEnzyme());
chai.should();

describe('<GeoMap />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <GeoMap onChange={() => {}} value={{lat: 51, lng: 21}} />,
    );

    wrapper.should.to.matchSnapshot();
  });

  describe('constructor()', () => {
    it('should contain proper state based on props', () => {
      const value = {
        lat: 52,
        lng: 21,
      };

      const wrapper = shallow(
        <GeoMap
          onChange={() => {}}
          value={{
            lat: 52,
            lng: 21,
          }}
        />,
      );

      wrapper.state().should.deep.equal({
        position: value,
        isSearchMarkerUsed: false,
      });
    });
  });

  describe('handleMarkerPositionChange()', () => {
    it('should call onChange()', () => {
      const handleChange = sinon.spy();
      const wrapper = shallow(<GeoMap onChange={handleChange} value={{}} />);

      const instance = wrapper.instance() as GeoMap;

      instance.handleMarkerPositionChange({lat: 21, lng: 20});

      handleChange.should.have.callCount(1);
    });

    it('should change state', () => {
      const wrapper = shallow(<GeoMap onChange={() => {}} value={{}} />);

      const instance = wrapper.instance() as GeoMap;

      instance.handleMarkerPositionChange({lat: 21, lng: 20});
      wrapper.state().isSearchMarkerUsed.should.equal(true);
      wrapper.state().position.should.deep.equal({lat: 21, lng: 20});
    });
  });

  describe('handleLocationChange()', () => {
    it('should call onChange()', () => {
      const handleChange = sinon.spy();
      const wrapper = shallow(<GeoMap onChange={handleChange} value={{}} />);

      const instance = wrapper.instance() as GeoMap;

      instance.handleLocationChange(true, {
        lat: 30,
        lng: 40,
      });

      handleChange.should.have.callCount(1);
    });

    it('should change state', () => {
      const handleChange = sinon.spy();
      const wrapper = shallow(<GeoMap onChange={handleChange} value={{}} />);

      const instance = wrapper.instance() as GeoMap;

      instance.handleLocationChange(true, {
        lat: 30,
        lng: 40,
      });

      wrapper.state().isSearchMarkerUsed.should.equal(true);
      wrapper.state().position.should.deep.equal({
        lat: 30,
        lng: 40,
      });
    });
  });
});
