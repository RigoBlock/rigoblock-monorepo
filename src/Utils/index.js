export function toHex (str) {
  if (str && str.toString) {
    str = str.toString(16);
  }

  if (str && str.substr(0, 2) === '0x') {
    return str.toLowerCase();
  }

  return `0x${(str || '').toLowerCase()}`;
}
