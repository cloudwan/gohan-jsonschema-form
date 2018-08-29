import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import Asterisk from './Asterisk';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<Asterisk/>', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<Asterisk />);

      wrapper.should.to.matchSnapshot();
    });
  });
});
