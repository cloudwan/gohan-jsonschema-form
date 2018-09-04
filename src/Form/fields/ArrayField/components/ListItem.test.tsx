import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import ListItem from './ListItem';

chai.use(chaiEnzyme());
chai.should();

describe('<ListItem/>', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <ListItem
          onRemoveButtonClick={() => null}
          onMoveUpButtonClick={() => null}
          onMoveDownButtonClick={() => null}
          index={0}
          itemsCount={2}
        >
          test
        </ListItem>,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
