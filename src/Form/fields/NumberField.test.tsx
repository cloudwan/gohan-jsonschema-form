import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import NumberField from './NumberField';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

const should = chai.should();

describe('<NumberField/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<NumberField schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('validate', () => {
    it('should return undefined when value passed validation', () => {
      const wrapper = shallow(
        <NumberField
          id="foo"
          schema={{type: ['number']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      should.equal(wrapper.instance().validate(5), undefined);
    });

    it("should show one error when value is required and it's undefined", () => {
      const wrapper = shallow(
        <NumberField
          id="foo"
          schema={{type: ['number']}}
          uiSchema={{}}
          isRequired={true}
        />,
      );

      const result = wrapper.instance().validate(undefined).length;
      result.should.equal(1);
    });

    it('should show one error when value is invalid', () => {
      const wrapper = shallow(
        <NumberField
          id="foo"
          schema={{type: ['number']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      const result = wrapper.instance().validate(null).length;
      result.should.equal(1);
    });
  });
});
