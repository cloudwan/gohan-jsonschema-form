import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {Api} from './Api';

chai.should();
chai.use(sinonChai);

describe('Api', () => {
  describe('fetch', () => {
    let xhr;
    let requests;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];

      xhr.onCreate = req => {
        requests.push(req);
      };
    });

    afterEach(() => {
      xhr.restore();
    });

    it('should fetch data as JSON', done => {
      const data = {foo: 'bar'};
      const json = JSON.stringify(data);

      Api.fetch('https://foo.com').then(response => {
        response.should.deep.equal(data);
        done();
      });

      requests[0].respond(200, {'Content-Type': 'application/json'}, json);
    });

    it('should fetch data as JSON without headers', done => {
      const data = {foo: 'bar'};
      const json = JSON.stringify(data);

      Api.fetch('https://foo.com', null).then(response => {
        response.should.deep.equal(data);
        done();
      });

      requests[0].respond(200, {'Content-Type': 'application/json'}, json);
    });

    it('should throw an error with status 500', done => {
      Api.fetch('https://foo.com')
        .then(response => {
          done();
        })
        .catch(error => {
          error.status.should.equal(500);
          error.statusText.should.equal('Internal Server Error');
          done();
        });

      requests[0].respond(500);
    });

    it('should throw an error with status 0', done => {
      Api.fetch('https://foo.com')
        .then(response => {
          console.log('response:', response);
          done();
        })
        .catch(error => {
          error.status.should.equal(0);
          done();
        });

      requests[0].error();
    });
  });
});
