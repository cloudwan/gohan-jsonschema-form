import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Fieldset from './Fieldset';

chai.use(chaiEnzyme());
chai.should();

describe('<Fieldset/>', () => {
  describe('render', () => {
    it('should match snapshot when Fieldset is tab', () => {
      const wrapper = shallow(
        <Fieldset id="test" isTab={true}>
          test
        </Fieldset>,
      );

      wrapper.should.to.matchSnapshot();
    });

    it("should match snapshot when Fieldset isn't tab", () => {
      const wrapper = shallow(<Fieldset id="test">test</Fieldset>);

      wrapper.should.to.matchSnapshot();
    });
  });
});
