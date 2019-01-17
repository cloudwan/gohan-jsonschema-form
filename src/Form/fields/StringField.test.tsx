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
      const wrapper = shallow(<StringField schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot for defined schema format', () => {
      const wrapper = shallow(<StringField schema={{format: 'ipv4'}} />);

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

    it('should return component with errors when value is required and it is undefined', () => {
      const wrapper = shallow(
        <StringField
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
        <StringField
          id="foo"
          schema={{type: ['string']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      const errorsWrapper = shallow(wrapper.instance().validate(null));
      errorsWrapper.type().should.equal('div');
    });

    it('should return component with errors when widget has errors', () => {
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

      const errorsWrapper = shallow(wrapper.instance().validate('bar'));
      errorsWrapper.type().should.equal('div');
    });
  });
});
