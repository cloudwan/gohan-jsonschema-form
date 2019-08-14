import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import BooleanField from './BooleanField';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

const should = chai.should();

describe('<BooleanField/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<BooleanField schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('validate', () => {
    it('should return undefined when value passed validation', () => {
      const wrapper = shallow(
        <BooleanField
          id="foo"
          schema={{type: ['boolean']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      should.equal(wrapper.instance().validate(false), undefined);
    });

    it('should show one error when value is required and it is undefined', () => {
      const wrapper = shallow(
        <BooleanField
          id="foo"
          schema={{type: ['boolean']}}
          uiSchema={{}}
          isRequired={true}
        />,
      );

      const result = wrapper.instance().validate(false).length;
      result.should.equal(1);
    });

    it('should show one error when value is invalid', () => {
      const wrapper = shallow(
        <BooleanField
          id="foo"
          schema={{type: ['boolean']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      const result = wrapper.instance().validate(null).length;
      result.should.equal(1);
    });
  });
});
