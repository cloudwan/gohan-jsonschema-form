/* tslint:disable */
/* global it, describe */
import * as chai from 'chai';

import * as utils from './utils';

chai.should();

describe('utils', () => {
  describe('asNumber', () => {
    it('should return a number out of a string representing a number', () => {
      utils.asNumber('3').should.equal(3);
    });

    it('should return a float out of a string representing a float', () => {
      utils.asNumber('3.14').should.equal(3.14);
    });

    it('should return the raw value if the input ends with a dot', () => {
      utils.asNumber('3.').should.equal('3.');
    });

    it('should not convert the value to an integer if the input ends with a 0', () => {
      utils.asNumber('3.0').should.equal('3.0');
    });

    it('should allow numbers with a 0 in the first decimal place', () => {
      utils.asNumber('3.07').should.equal(3.07);
    });

    it('should return undefined if the input is empty', () => {
      chai.should().equal(utils.asNumber(''), undefined);
    });
  });
});
