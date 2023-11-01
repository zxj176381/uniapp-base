import request from "../request";

/**
 * 获取阿里云鉴权
 */
export const getAliyunOSSTSService: Service<AliyunOSSTSResult> = () => {
  return request({
    path: "/files/osssts",
    method: "POST"
  });
};
