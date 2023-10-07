import { serializeUrl } from "@/utils";
import { HEADER_MAP, CONTENT_TYPE_MAP, responseStatusMap } from "./constants";
import { cryptoDecrypt } from "./decrypt";
import { normalizeResponseData } from "./utils";
import { useDialog, useStorage } from "@/hooks";

// TODO 使用本地缓存存储 token 再使用 hooks 校验和获取新的 token 然后进行回调调用接口
export default function request({
  url,
  path,
  query = {},
  data = {},
  header = {},
  contentType = "json",
  method = "GET",
  withToken = true,
  showDialog = false
}: ServiceOptions) {
  let requestUrl = url ? url : import.meta.env.VITE_SERVICE_URL + path;
  // 添加 query 数据
  requestUrl = serializeUrl(requestUrl, query);
  // 添加 contentType
  header[HEADER_MAP.CONTENT_TYPE] = CONTENT_TYPE_MAP[contentType];
  // 添加 token
  if (withToken) {
    const { getStorage } = useStorage();
    const tokenInfo = getStorage("tokenInfo");
    header[HEADER_MAP.TOKEN] = tokenInfo ? tokenInfo.token : "";
  }

  return new Promise<ServiceReturnResponse<any>>((resolve, reject) => {
    uni.request({
      url: requestUrl,
      data,
      header,
      method,
      timeout: import.meta.env.VITE_TIMEOUT,
      success: (res) => {
        if (res.statusCode === 200) {
          let resData = res.data as ServiceResponse<any>;
          if (!import.meta.env.VITE_ENV) {
            resData = cryptoDecrypt(resData.result);
          }
          const result = normalizeResponseData(resData);
          if (result._status === responseStatusMap.FAIL) {
            if (showDialog) {
              const { showToast } = useDialog();
              // 错误时是否弹出提示
              showToast(result._msg);
            }
          }
          resolve(result);
        } else {
          reject(res);
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}
