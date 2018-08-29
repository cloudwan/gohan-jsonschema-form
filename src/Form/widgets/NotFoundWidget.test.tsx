import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import NotFoundWidget from './NotFoundWidget';

const should = chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<NotFoundWidget/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<NotFoundWidget schema={{}} />);

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('get value', () => {
    it('should return undefined', () => {
      const wrapper = shallow(<NotFoundWidget schema={{}} />);
      const instance = wrapper.instance() as NotFoundWidget;

      should.not.exist(instance.value);
    });
  });

  describe('get isValid', () => {
    it('should returns false', () => {
      const wrapper = shallow(<NotFoundWidget schema={{}} />);
      const instance = wrapper.instance() as NotFoundWidget;

      instance.isValid.should.equal(false);
    });
  });
});
