import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import CodeEditorWidget from './CodeEditorWidget';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<CodeEditorWidget/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<CodeEditorWidget schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });
  });
});
