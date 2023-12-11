// e.g., toBinaryString(42, 8) => '0010 1010'
export function toBinaryString(value: number, width?: number): string {
  let binaryString = value.toString(2);

  if (width !== undefined) {
      binaryString = binaryString.padStart(width, '0');
  }

  binaryString = binaryString.split('').reverse().join('')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .split('').reverse().join('');

  return binaryString;
}
