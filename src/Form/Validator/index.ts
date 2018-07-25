import * as Ajv from 'ajv';

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
  },
});

export default ajv;
