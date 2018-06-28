import ipV4Format from './ipV4Format';
import ipV6Format from './ipV6Format';

export default function cidrFormat(data: string): boolean {
  if (!data) {
    return true;
  }

  const i: number = data.indexOf('/');

  if (i < 0) {
    return false;
  }

  const address: string = data.slice(0, i);
  const mask: number = Number(data.slice(i + 1, data.length));

  if (mask <= 0) {
    return false;
  }

  if (ipV4Format.test(address) && mask <= 32) {
    return true;
  } else if (ipV6Format.test(address) && mask <= 128) {
    return true;
  }
  return false;
}
