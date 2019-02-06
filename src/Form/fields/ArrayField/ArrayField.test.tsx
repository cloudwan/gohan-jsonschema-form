import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import ArrayField from './ArrayField';

chai.use(chaiEnzyme());
chai.should();

const should = chai.should();

describe('<ArrayField />', () => {
  beforeEach(() => {
    const fake = sinon.fake.returns('');
    sinon.replace(Date.prototype, 'valueOf', fake);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(
      <ArrayField
        schema={{
          items: {
            type: 'string',
          },
          type: 'array',
        }}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot with default value', () => {
    const wrapper = shallow(
      <ArrayField
        schema={{
          items: {
            type: 'string',
          },
          type: 'array',
          default: ['baz'],
        }}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot with value passed by props', () => {
    const wrapper = shallow(
      <ArrayField
        schema={{
          items: {
            type: 'string',
          },
          type: 'array',
          default: ['baz'],
        }}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot when array items are objects', () => {
    const wrapper = shallow(
      <ArrayField
        schema={{
          items: {
            properties: {
              foo: {
                id: 'foo',
                type: 'string',
              },
              bar: {
                id: 'bar',
                type: 'string',
              },
            },
            type: ['object'],
          },
          type: ['array'],
        }}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot when array has uniqueItems', () => {
    const wrapper = shallow(
      <ArrayField
        schema={{
          items: {
            type: ['string'],
            enum: ['foo', 'bar', 'baz'],
          },
          uniqueItems: true,
          type: ['array'],
        }}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });
});
