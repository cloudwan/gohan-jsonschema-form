import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import Errors from './Errors';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<Errors/>', () => {
  describe('render', () => {
    it('should match snapshot w/o errors array', () => {
      const wrapper = shallow(<Errors />);

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot with empty errors array', () => {
      const wrapper = shallow(<Errors errors={[]} />);

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot with one error in errors array', () => {
      const wrapper = shallow(
        <Errors
          errors={[
            {
              message: 'Something wrong',
            },
          ]}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
