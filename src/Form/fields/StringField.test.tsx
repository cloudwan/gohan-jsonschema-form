import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import StringField from './StringField';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

const should = chai.should();

describe('<StringField/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<StringField schema={{}} uiSchema={{}} />);

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot for defined schema format', () => {
      const wrapper = shallow(
        <StringField schema={{format: 'ipv4'}} uiSchema={{}} />,
      );

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('validate', () => {
    it('should return undefined when value passed validation', () => {
      const wrapper = shallow(
        <StringField
          id="foo"
          schema={{type: ['string']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      should.equal(wrapper.instance().validate('bar'), undefined);
    });

    it('should show one error when value is required and it is undefined', () => {
      const wrapper = shallow(
        <StringField
          id="foo"
          schema={{type: ['string']}}
          uiSchema={{}}
          isRequired={true}
        />,
      );

      const result = wrapper.instance().validate(undefined).length;
      result.should.equal(1);
    });

    it('should should show one error when value is invalid', () => {
      const wrapper = shallow(
        <StringField
          id="foo"
          schema={{type: ['string']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      const result = wrapper.instance().validate(null).length;
      result.should.equal(1);
    });

    it('should show one error when widget has errors', () => {
      const wrapper = shallow(
        <StringField
          id="foo"
          schema={{type: ['string']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      wrapper.instance().widget = {
        get errors() {
          return [{message: 'Bar error'}];
        },
      };

      const result = wrapper.instance().validate('bar').length;
      result.should.equal(1);
    });
  });
});
