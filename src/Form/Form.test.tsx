import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import {Form} from './';
import SchemaField from './fields/SchemaField';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<Form/>', () => {
  describe('render', () => {
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(
        <Form schema={{}} formData={{}} onSubmit={() => null} />,
      );

      wrapper.find(SchemaField).should.to.matchSnapshot();
    });
  });
});
