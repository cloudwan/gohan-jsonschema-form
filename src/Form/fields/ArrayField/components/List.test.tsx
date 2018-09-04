import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import List from './List';

chai.use(chaiEnzyme());
chai.should();

describe('<List/>', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<List>test</List>);

      wrapper.should.to.matchSnapshot();
    });
  });
});
