import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import DateTimePicker from './DateTimePicker';

chai.should();
chai.use(chaiEnzyme());

describe('DateTimePicker', () => {
  it('should match snapshot for minimal number of props', () => {
    const wrapper = shallow(
      <DateTimePicker onChange={() => null} onOk={() => null} />,
    );

    wrapper.should.to.matchSnapshot();
  });
});
