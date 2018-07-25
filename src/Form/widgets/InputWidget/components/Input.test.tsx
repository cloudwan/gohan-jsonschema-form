import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import Input from './Input';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('Input', () => {
  it('should match snapshot for minimal number of props', () => {
    const wrapper = shallow(<Input />);

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(
      <Input
        value={'test'}
        onChange={() => {}} // tslint:disable-line
        disabled={false}
        minLength={2}
        maxLength={100}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should call handler on input change', () => {
    const schema = {
      type: ['string'],
    };
    const handleChange = sinon.spy();
    const wrapper = shallow(<Input onChange={handleChange} />);

    wrapper.at(0).simulate('change', {target: {value: 'foo'}});
    handleChange.should.callCount(1);
  });
});
