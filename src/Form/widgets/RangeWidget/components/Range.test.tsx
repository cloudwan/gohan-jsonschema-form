import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Range from './Range';

chai.should();
chai.use(chaiEnzyme());

describe('Select', () => {
  it('should match snapshot for minimal number of props', () => {
    const wrapper = shallow(<Range />);

    wrapper.should.to.matchSnapshot();
  });
});
