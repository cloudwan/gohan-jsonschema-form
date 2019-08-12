import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import YamlField from './YamlField';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

const should = chai.should();

describe('<YamlField/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<YamlField schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot with SchemaHint', () => {
      const wrapper = shallow(<YamlField schema={{type: ['object']}} />);

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('validate', () => {
    it('should return undefined when value passed validation', () => {
      const wrapper = shallow(
        <YamlField
          id="foo"
          schema={{type: ['string']}}
          uiSchema={{}}
          isRequired={false}
        />,
      );

      should.equal(wrapper.instance().validate('test'), undefined);
    });

    it("should return component with errors when value is required and it's undefined", () => {
      const wrapper = shallow(
        <YamlField
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
        <YamlField
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
