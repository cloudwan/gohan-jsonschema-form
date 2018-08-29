import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import Legend from './Legend';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<Legend/>', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <Legend>
          <span id="foo">test</span>
        </Legend>,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
