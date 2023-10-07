export const isObject = (value: unknown): value is Record<any, any> => value !== null && typeof value === "object";
export const isFunction = (value: unknown): value is Function => typeof value === "function";
export const isString = (value: unknown): value is string => typeof value === "string";
export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";
export const isNumber = (value: unknown): value is number => typeof value === "number";
export const isUndef = (value: unknown): value is undefined => typeof value === "undefined";
export const isArray = (value: unknown): value is [] => Array.isArray(value);
// 校验是否以 http/https 开头
export function isHttp(path: string) {
  return /^(http|https):\/\//.test(path);
}

// 检测对象自身属性中是否具有指定的属性
const _hasOwnPrototype = Object.prototype.hasOwnProperty;
export function hasOwn(obj: Object, key: string) {
  return _hasOwnPrototype.call(obj, key);
}

/**
 * 判断是否是空对象
 * @param {Record<string, any>} obj
 * @return {Boolean}
 */
function isEmptyObject(obj: Record<string, any>): boolean {
  if (obj === null || typeof obj !== "object") {
    return true;
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

/**
 * 序列化地址信息
 * @param {String} url 地址信息
 * @param {Object} [params={}] 参数信息
 * @return {String} 拼接完成后的完整地址
 */
export const invalidQueryValues = ["undefined", "null", ""];
export function serializeUrl<T extends Record<string, any>>(url: string, params: T): string {
  if (!isEmptyObject(params)) {
    let queryString = "";
    if (!url.match(/\?/)) {
      queryString += "?";
    }
    for (const key in params) {
      const value = params[key];
      if (~invalidQueryValues.indexOf(value + "")) {
        continue;
      }
      queryString += `&${key}=${value}`;
    }
    url = url + queryString;
    url = url.replace(/\?&/, "?").replace(/\?$/, "");
  }
  return url;
}

// #start 地址信息
const queryParamPattern = /([^&]+)\=([^&]+)/;
// 获取参数
export function getUrlParams(url: string) {
  const queryIndex = url.indexOf("?");
  if (~queryIndex) {
    const queryString = url.substring(queryIndex + 1);
    const params: any = {};
    queryString.split("&").forEach((param) => {
      const matches = param.match(queryParamPattern);
      if (matches) {
        const key = matches[1];
        const value = matches[2];
        // 过滤一下无效的值
        if (!~invalidQueryValues.indexOf(value)) {
          params[key] = value;
        }
      }
    });
    return params;
  }
  return {};
}

export function getRelativePath(pagePath: string) {
  // 掐头去尾
  return pagePath.replace(/^\//, "").replace(/\?.*/, "");
}

// 路径转换为绝对路径
export function resolveAbsolutePagePath(pagePath: string) {
  if (pagePath.match(/^pages\//) && !pagePath.match(/^\//)) {
    pagePath = `/${pagePath}`;
  }
  return pagePath;
}

// 防抖
export function debounce<T extends (...args: any[]) => void>(func: T, delay = 1000): (...args: Parameters<T>) => void {
  let timroutID: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timroutID) {
      clearTimeout(timroutID);
      timroutID = null;
    }
    timroutID = setTimeout(() => {
      func(args);
    }, delay);
  };
}
