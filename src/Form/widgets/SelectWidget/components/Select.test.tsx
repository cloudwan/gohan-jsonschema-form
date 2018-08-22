import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import Select from './Select';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('Select', () => {
  it('should match snapshot for minimal number of props', () => {
    const wrapper = shallow(
      <Select
        options={[
          {value: 'foo', label: 'foo'},
          {value: 'bar', label: 'bar'},
          {value: 'baz', label: 'baz'},
        ]}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });
});
