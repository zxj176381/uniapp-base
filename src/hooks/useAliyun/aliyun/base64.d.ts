declare const Base64: {
  _keyStr: string;
  encode: (input: any) => string;
  decode: (input: any) => string;
  _utf8_encode: (string: any) => string;
  _utf8_decode: (utftext: any) => string;
};
export default Base64;
