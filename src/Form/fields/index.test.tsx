import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import {selectField} from './';

chai.use(chaiEnzyme());
chai.should();

chai.should();

describe('fields/index', () => {
  describe('selectField', () => {
    it('should return String field', () => {
      selectField('String').should.to.matchSnapshot();
    });

    it('should return NotFound field for wrong firld name', () => {
      selectField('Not').should.to.matchSnapshot();
    });

    it('should return NotFound field for incorrect name', () => {
      selectField({}).should.to.matchSnapshot();
    });
  });
});
