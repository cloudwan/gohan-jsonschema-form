import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import Description from './Description';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<Description/>', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<Description>Foo</Description>);

      wrapper.should.to.matchSnapshot();
    });
  });
});
