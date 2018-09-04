import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import ListAddButton from './ListAddButton';

chai.use(chaiEnzyme());
chai.should();

describe('<ListAddButton/>', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<ListAddButton onClick={() => null} />);

      wrapper.should.to.matchSnapshot();
    });
  });
});
