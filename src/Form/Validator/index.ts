import Ajv from 'ajv';
import {safeLoad} from 'js-yaml';

import cidrFormat from './cidrFormat';
import emailFormat from './emailFormat';
import ipV4Format from './ipV4Format';
import ipV6Format from './ipV6Format';
import macFormat from './macFormat';
import uuidFormat from './uuidFormat';

const ajv = new Ajv({
  allErrors: true,
  formats: {
    cidr: cidrFormat,
    mac: macFormat,
    email: emailFormat,
    uuid: uuidFormat,
    ipv4: ipV4Format,
    ipv6: ipV6Format,
    'password-confirm': () => true,
    text: data => typeof data === 'string',
    js: data => typeof data === 'string',
  },
});

export default ajv;
