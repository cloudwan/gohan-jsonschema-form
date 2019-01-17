import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import SelectField from './SelectField';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

const should = chai.should();

describe('<SelectField/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<SelectField schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema has relation', () => {
      const wrapper = shallow(
        <SelectField
          schema={{
            relation: 'foo',
          }}
        />,
      );
    });
  });

  describe('validate', () => {
    it('should return undefined when value passed validation', () => {
      const wrapper = shallow(
        <SelectField
          id="foo"
          schema={{type: ['string']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      should.equal(wrapper.instance().validate('bar'), undefined);
    });

    it('should return component with errors when value is required and it is undefined', () => {
      const wrapper = shallow(
        <SelectField
          id="foo"
          schema={{type: ['string']}}
          uiSchema={{}}
          isRequired={true}
        />,
      );

      const errorsWrapper = shallow(wrapper.instance().validate(undefined));
      errorsWrapper.type().should.equal('div');
    });

    it('should return component with errors when value is invalid', () => {
      const wrapper = shallow(
        <SelectField
          id="foo"
          schema={{type: ['string']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      const errorsWrapper = shallow(wrapper.instance().validate(null));
      errorsWrapper.type().should.equal('div');
    });
  });
});
