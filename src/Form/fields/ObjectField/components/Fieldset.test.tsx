import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Fieldset from './Fieldset';

chai.use(chaiEnzyme());
chai.should();

describe('<Fieldset/>', () => {
  describe('render', () => {
    it('should match snapshot when Fieldset is tab', () => {
      const wrapper = shallow(
        <Fieldset id="test" isTab={true}>
          test
        </Fieldset>,
      );

      wrapper.should.to.matchSnapshot();
    });

    it("should match snapshot when Fieldset isn't tab", () => {
      const wrapper = shallow(<Fieldset id="test">test</Fieldset>);

      wrapper.should.to.matchSnapshot();
    });
  });

  // describe('handleToggleButtonClick', () => {
  //   it('should create empty object when value is undefined', () => {
  //     const wrapper = shallow(
  //       <ObjectField
  //         schema={{
  //           type: ['object'],
  //           properties: {
  //             foo: {
  //               title: 'Foo',
  //               type: ['string'],
  //             },
  //           },
  //           propertiesOrder: ['foo'],
  //         }}
  //       />,
  //     );
  //     const instance = wrapper.instance() as ObjectField;
  //     instance.handleToggleButtonClick();
  //     wrapper.state().isNull.should.equal(false);
  //     wrapper.state().value.should.deep.equal({});
  //   });

  //   it('should change value to null and isNull flag to true when object exists', () => {
  //     const wrapper = shallow(
  //       <ObjectField
  //         schema={{
  //           type: ['object'],
  //           properties: {
  //             foo: {
  //               title: 'Foo',
  //               type: ['string'],
  //             },
  //           },
  //           propertiesOrder: ['foo'],
  //         }}
  //       />,
  //     );
  //     const instance = wrapper.instance() as ObjectField;
  //     wrapper.setState({value: {}});
  //     instance.handleToggleButtonClick();
  //     wrapper.state().isNull.should.equal(true);
  //     should.equal(wrapper.state().value, null);
  //   });
  // });

  // describe('orderProperties', () => {
  //   it('should return return sorted properties', () => {
  //     const wrapper = shallow(
  //       <ObjectField
  //         schema={{
  //           type: ['object'],
  //           properties: {
  //             foo: {
  //               type: ['string'],
  //             },
  //             bar: {
  //               type: ['number'],
  //             },
  //           },
  //           propertiesOrder: ['foo', 'bar'],
  //         }}
  //       />,
  //     );
  //     const instance = wrapper.instance() as ObjectField;
  //     const properties = Object.keys(instance.props.schema.properties);
  //     instance
  //       .orderProperties(properties, instance.props.schema.propertiesOrder)
  //       .should.deep.equal(properties);
  //   });

  //   it("should return return unsorted properties when order isn't defined", () => {
  //     const wrapper = shallow(
  //       <ObjectField
  //         schema={{
  //           type: ['object'],
  //           properties: {
  //             foo: {
  //               type: ['string'],
  //             },
  //             bar: {
  //               type: ['number'],
  //             },
  //           },
  //         }}
  //       />,
  //     );
  //     const instance = wrapper.instance() as ObjectField;
  //     const properties = Object.keys(instance.props.schema.properties);
  //     instance
  //       .orderProperties(properties, instance.props.schema.propertiesOrder)
  //       .should.deep.equal(properties);
  //   });
  // });
});
