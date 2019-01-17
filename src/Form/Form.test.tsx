import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import SchemaField from './fields/SchemaField';
import {Form} from './';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<Form/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(<Form schema={{}} formData={{}} />);

      wrapper.find(SchemaField).should.to.matchSnapshot();
    });
  });
});
