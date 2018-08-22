import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';

import InputNumber from './InputNumber';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('Input', () => {
  it('should match snapshot for minimal number of props', () => {
    const wrapper = shallow(<InputNumber />);

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(
      <InputNumber
        value={0}
        onChange={() => {}} // tslint:disable-line
        disabled={false}
        min={0}
        max={100}
        step={1}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should call handler on input change', () => {
    const schema = {
      type: ['string'],
    };
    const handleChange = sinon.spy();
    const wrapper = shallow(<InputNumber onChange={handleChange} />);

    wrapper.at(0).simulate('change', 5);
    handleChange.should.callCount(1);
  });
});
