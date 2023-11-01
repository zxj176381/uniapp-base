// 请求头信息中的 content-type
export const CONTENT_TYPE_MAP = {
  form: "application/x-www-form-urlencoded",
  json: "application/json"
} as const;

// 头信息
export const HEADER_MAP = {
  CONTENT_TYPE: "content-type",
  TOKEN: "X-Access-Token",
  GUID: "guid"
} as const;

export const responseStatusMap = {
  SUCCESS: 200, // 请求成功且操作成功，对应 request 方法的 success 回调。
  FAIL: 500 // 请求成功但操作失败，对应 request 方法的 success 回调。
};
