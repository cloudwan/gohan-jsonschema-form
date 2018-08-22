import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Switch from './Switch';

chai.should();
chai.use(chaiEnzyme());

describe('Switch', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Switch schema={{type: ['boolean']}} />);

    wrapper.should.to.matchSnapshot();
  });
});
