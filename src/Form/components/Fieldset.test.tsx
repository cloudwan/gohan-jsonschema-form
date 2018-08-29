import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import Fieldset from './Fieldset';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<Fieldset/>', () => {
  describe('render', () => {
    it('should match snapshot w/o children', () => {
      const wrapper = shallow(<Fieldset />);

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot with children', () => {
      const wrapper = shallow(
        <Fieldset>
          <span>foo</span>
        </Fieldset>,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
