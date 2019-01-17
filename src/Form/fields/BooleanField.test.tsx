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

    it('should return component with errors when value is required and it is undefined', () => {
      const wrapper = shallow(
        <BooleanField
          id="foo"
          schema={{type: ['boolean']}}
          uiSchema={{}}
          isRequired={true}
        />,
      );

      const errorsWrapper = shallow(wrapper.instance().validate(false));
      errorsWrapper.type().should.equal('div');
    });

    it('should return component with errors when value is invalid', () => {
      const wrapper = shallow(
        <BooleanField
          id="foo"
          schema={{type: ['boolean']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      const errorsWrapper = shallow(wrapper.instance().validate(null));
      errorsWrapper.type().should.equal('div');
    });
  });
});
