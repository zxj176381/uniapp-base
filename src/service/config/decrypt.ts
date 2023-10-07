import CryptoJS from "crypto-js";
import pako from "pako";

export const cryptoDecrypt = (options: string) => {
  if (!options) return "";
  options = options.replace(new RegExp("_", "gm"), "=");
  const parsedOptions = CryptoJS.enc.Base64.parse(options);
  options = parsedOptions.toString(CryptoJS.enc.Utf8);
  const publicKey = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_PARSE_KEY);
  const decryptOptions = CryptoJS.AES.decrypt(options, publicKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  const res = CryptoJS.enc.Utf8.stringify(decryptOptions).toString();
  //转换成功
  const arrayBuffer = wx.base64ToArrayBuffer(res);
  const result = pako.inflate(arrayBuffer, { to: "string" });
  return JSON.parse(result);
};
