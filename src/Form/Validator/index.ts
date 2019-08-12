import Ajv from 'ajv';

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
    'ipv4-network': data => typeof data === 'string',
    'ipv4-address-with-cidr': data => typeof data === 'string',
    ipv6: ipV6Format,
    'password-confirm': () => true,
    text: data => typeof data === 'string',
    js: data => typeof data === 'string',
    yaml: data => typeof data === 'string',
  },
});

export default ajv;
