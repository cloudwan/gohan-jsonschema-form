import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';

import InputSearch from './InputSearch';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<InputSearch/>', () => {
  it('should match snapshot for minimal number of props', () => {
    const wrapper = shallow(<InputSearch />);

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<InputSearch value={'test'} />);

    wrapper.should.to.matchSnapshot();
  });
});
