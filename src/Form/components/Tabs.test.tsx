import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Tabs from './Tabs';

chai.use(chaiEnzyme());
chai.should();

describe('<Tabs/>', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Tabs
        activeTabKey="key0"
        onChangeTab={() => 'bar'}
        onEditTab={() => 'baz'}
      >
        <span>Test</span>
      </Tabs>,
    );

    wrapper.should.to.matchSnapshot();
  });
});
