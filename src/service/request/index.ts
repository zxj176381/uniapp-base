import { useDialog, useStorage } from "@/hooks";
import { serializeUrl, logInfo, removeEmptyValues } from "@/utils";
import { HEADER_MAP, CONTENT_TYPE_MAP, responseStatusMap } from "./constants";
import { cryptoDecrypt, encrypt } from "./decrypt";
import { normalizeResponseData } from "./utils";

const { deviceId, platform, SDKVersion, deviceModel, system, version, deviceType } = uni.getSystemInfoSync();

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
  header[HEADER_MAP.GUID] = encrypt({
    deviceId,
    platform,
    SDKVersion,
    deviceModel,
    system,
    version,
    deviceType,
    appName: import.meta.env.VITE_APP_NAME,
    appid: import.meta.env.VITE_WECHAT_APPID
  });
  // 添加 token
  if (withToken) {
    const { getStorage } = useStorage();
    const tokenInfo = getStorage("tokenInfo");
    header[HEADER_MAP.TOKEN] = tokenInfo ? tokenInfo.token : "";
  }

  return new Promise<ServiceReturnResponse<any>>((resolve, reject) => {
    uni.request({
      url: requestUrl,
      data: data ? removeEmptyValues(data) : undefined,
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
          logInfo(`@${requestUrl}`, data, result);
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
