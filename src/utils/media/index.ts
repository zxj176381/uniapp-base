import { isHttp } from "../common";

// 拼接静态资源路径
export function resolveStaticUrl(path: string) {
  return path ? (isHttp(path) ? path : `${import.meta.env.VITE_OSS_SERVICE_URL}/${path}`) : "";
}

// 删除半路径
export function deleteStaticUrl(path: string) {
  return path.replace(`${import.meta.env.VITE_OSS_SERVICE_URL}/`, "");
}

export const resolveCacheUrl = (imageSrc: string) => {
  return imageSrc
    ? imageSrc.includes(wx.env.USER_DATA_PATH)
      ? imageSrc
      : `${wx.env.USER_DATA_PATH}/static/${imageSrc}`
    : "";
};
