import { base64url_encode } from "./aliyun/text_base64";
import { getRelativePath, getUrlParams, hasOwn, invalidQueryValues, isObject, serializeUrl } from "@/utils";

export function useAliyun() {
  // 图片处理接口
  const serializeOSSImage = (filePath: string, optionsList: any = []) => {
    if (!filePath) {
      return "";
    }
    let queryString = "";
    for (let index = 0; index < optionsList.length; index++) {
      const options = optionsList[index];
      let ossString = "/" + (options.dispose || "resize");
      if (isObject(options)) {
        for (const key in options) {
          let value: string = options[key];
          if (~invalidQueryValues.indexOf(value + "")) {
            continue;
          }
          if (key === "text") {
            value = base64url_encode(value);
          }
          if (key !== "dispose") {
            ossString += `,${key}${value !== "" ? "_" + value : ""}`;
          }
        }
      } else {
        ossString += `,${options}`;
      }
      queryString += ossString;
    }
    const query = getUrlParams(filePath);
    const src = getRelativePath(filePath);
    if (hasOwn(query, "x-oss-process")) {
      query["x-oss-process"] = query["x-oss-process"] + queryString;
      filePath = serializeUrl(src, query);
    } else {
      if (!filePath.match(/\?/)) {
        filePath += "?";
      }
      filePath = filePath + "&x-oss-process=image" + queryString;
      filePath = filePath.replace(/\?&/, "?").replace(/\?$/, "");
    }
    return filePath;
  };
  // 获取图片信息
  const getOSSImageInfo = (filePath: string) => {
    return new Promise<OSSImageInfoResult["data"] | null>((resolve) => {
      filePath = serializeOSSImage(filePath, [{ dispose: "info" }]);
      uni.request({
        url: filePath,
        success: (res) => {
          const result = res.data as OSSImageInfoResult["data"];
          resolve(result);
        },
        fail: () => {
          resolve(null);
        }
      });
    });
  };

  return {
    serializeOSSImage,
    getOSSImageInfo
  };
}
