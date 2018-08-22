import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Template from './Template';

chai.use(chaiEnzyme());
chai.should();

chai.should();

describe('<Template />', () => {
  it('should match snapshot with only required props', () => {
    const wrapper = shallow(
      <Template
        description={'test description'}
        id={'test.id'}
        title={'Test Title'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot with app props', () => {
    const wrapper = shallow(
      <Template
        description={'test description'}
        id={'test.id'}
        title={'Test Title'}
        isRequired={true}
      >
        <div>test</div>
      </Template>,
    );

    wrapper.should.to.matchSnapshot();
  });
});
