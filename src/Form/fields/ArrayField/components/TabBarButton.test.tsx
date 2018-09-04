import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import TabBarButton from './TabBarButton';

chai.use(chaiEnzyme());
chai.should();

describe('<TabBarButton/>', () => {
  it('should match snapshot with minimal props', () => {
    const wrapper = shallow(<TabBarButton iconType="left" />);

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(
      <TabBarButton
        iconType="left"
        disabled={true}
        prefix={'foo'}
        postfix={'bar'}
        onClick={() => 'baz'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });
});
