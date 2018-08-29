import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import Label from './Label';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<Label/>', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <Label htmlFor="foo">
          <span id="foo">test</span>
        </Label>,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
