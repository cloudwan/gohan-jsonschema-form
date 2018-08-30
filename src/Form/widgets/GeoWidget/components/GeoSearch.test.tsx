import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';

import {withLeaflet} from 'react-leaflet';

import GeoSearch from './GeoSearch';

chai.use(chaiEnzyme());
chai.should();

describe('<GeoSearch />', () => {
  const WrappedSearch = withLeaflet(GeoSearch);

  describe('render()', () => {
    it('should render null', () => {
      const wrapper = shallow(
        <WrappedSearch
          setSearchMarkerUsed={() => {}}
          onMarkerPositionChange={() => {}}
        />,
      );

      wrapper.equals(null);
    });
  });
});
