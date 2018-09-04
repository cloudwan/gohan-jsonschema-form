import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import TabBar from './TabBar';

chai.use(chaiEnzyme());
chai.should();

describe('<TabBar/>', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <TabBar>
        <div>Test 1</div>
        <div>Test 2</div>
      </TabBar>,
    );

    wrapper.should.to.matchSnapshot();
  });
});
