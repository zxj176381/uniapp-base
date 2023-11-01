import type { ComponentInternalInstance } from "vue";

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

/**
 * 数字转为汉字
 */
export function convertToChinaNum(num: number): string {
  var arr1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  var arr2 = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"]; //可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return "";
  }
  var english = num.toString().split("");
  var result = "";
  for (var i = 0; i < english.length; i++) {
    var des_i = english.length - 1 - i; //倒序排列设值
    result = arr2[i] + result;
    var arr1_index = english[des_i] as unknown as number;
    result = arr1[arr1_index] + result;
  }
  //将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十");
  //合并中间多个零为一个零
  result = result.replace(/零+/g, "零");
  //将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, "亿").replace(/零万/g, "万");
  //将【亿万】换成【亿】
  result = result.replace(/亿万/g, "亿");
  //移除末尾的零
  result = result.replace(/零+$/, "");
  //将【零一十】换成【零十】
  //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
  //将【一十】换成【十】
  result = result.replace(/^一十/g, "十");
  return result;
}

/**
 * 提取数组中每个对一个值为键名，一个为键值
 * @param {Array} array 原数组
 * @param {String} key 键名
 * @param {String} value 键值
 * @param {Object} [extra={}] 额外的参数
 * @returns {Object}
 */
export function getArrayKeyToValue(array: any[], key: string, value: string, extra = {}) {
  const data = array.reduce(
    (_, keys) => ({
      ..._,
      [keys[key]]: keys[value],
      ...extra
    }),
    {}
  );
  return data;
}

// 获取元素宽高
export function getElementInfo(
  className: string,
  context: ComponentInternalInstance | null
): Promise<UniApp.NodeInfo | UniApp.NodeInfo[]> {
  return new Promise((resolve) => {
    const getInfo = () => {
      uni
        .createSelectorQuery()
        .in(context)
        .selectAll(`.${className}`)
        .boundingClientRect((size) => {
          if (Array.isArray(size)) {
            const item = size[0];
            if (item.width && item.height) {
              if (size.length === 1) {
                resolve(size[0]);
              } else {
                resolve(size);
              }
            } else {
              setTimeout(() => {
                getInfo();
              }, 120);
            }
          }
        })
        .exec();
    };
    getInfo();
  });
}

// 获取元素宽高
export function getElementInfoComponent(className: string, context: any): Promise<UniApp.NodeInfo> {
  return new Promise((resolve) => {
    const getInfo = () => {
      context
        .createSelectorQuery()
        .select(`.${className}`)
        .boundingClientRect((size: UniApp.NodeInfo | null) => {
          if (size && size.width && size.height) {
            resolve(size);
          } else {
            setTimeout(() => {
              getInfo();
            }, 120);
          }
        })
        .exec();
    };
    getInfo();
  });
}

/**
 * 多出字符显示省略号
 * @param str 原字符串
 * @param place 裁剪长度
 * @param isEllipsis 是否显示省略号
 * @returns string
 */
export function interceptString(str: string, place: number, isEllipsis = true) {
  if (!str) return str;
  if (str.length > place) {
    return str.substring(0, place) + (isEllipsis ? "..." : "");
  }
  return str.substring(0, place);
}

/**
 * 删除对象中为false的键值对
 */
export function removeEmptyValues(obj: Record<string, any>) {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value != null && value !== ""));
}

/**
 * 模糊手机号信息
 */
export function fuzzyPhone(value: string) {
  if (!value) return "";
  return value.replace(/^\d{3}(\d+)\d{4}$/, (match, $1) => {
    return match.replace($1, "****");
  });
}

/**
 * 获取随机数
 */
export function uuid(len: number, radix?: number) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    var r;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}
