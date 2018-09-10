import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import WidgetError from './WidgetError';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<WidgetError/>', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<WidgetError messages={['foo', 'bar']} />);

      wrapper.should.to.matchSnapshot();
    });
  });
});
