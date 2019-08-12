import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import SchemaHint from './SchemaHint';

chai.should();
chai.use(chaiEnzyme());

describe('<SchemaHint/>', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SchemaHint schema={{id: 'test'}} />);

    wrapper.should.to.matchSnapshot();
  });
});
