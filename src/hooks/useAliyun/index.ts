import uploadFile from "@/service/upload";
import { useAliyunStore } from "@/store";
import { base64url_encode } from "./aliyun/text_base64";
import Base64 from "./aliyun/base64";
import Crypto from "./aliyun/crypto";
import "./aliyun/hmac";
import "./aliyun/sha1";
import { getRelativePath, getUrlParams, hasOwn, invalidQueryValues, isObject, serializeUrl, uuid } from "@/utils";
import { responseStatusMap } from "@/service/request/constants";
import { useDialog } from "../useDialog";
import dayjs from "dayjs";

export function useAliyun() {
  const { showToast } = useDialog();
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
    return new Promise<OSSImageInfoResult["data"]>((resolve) => {
      filePath = serializeOSSImage(filePath, [{ dispose: "info" }]);
      uni.request({
        url: filePath,
        success: (res) => {
          const result = res.data as OSSImageInfoResult["data"];
          resolve(result);
        }
      });
    });
  };

  // 批量获取图片信息
  const getOSSImageListInfo = (filePathList: string[]) => {
    return new Promise<OSSImageInfoResult["data"][]>((resolve) => {
      const promiseList: Promise<OSSImageInfoResult["data"]>[] = [];
      filePathList.forEach((item) => {
        promiseList.push(getOSSImageInfo(item));
      });
      Promise.all(promiseList).then((listRes) => {
        resolve(listRes);
      });
    });
  };

  // 批量上传文件
  const uploadFileList = (options: UploadFileListOptions) => {
    return new Promise<PromiseSettledResult<UploadOSSSuccess>[]>((resolve) => {
      const { getAliyunOSSTS } = useAliyunStore();
      getAliyunOSSTS().then((ossts) => {
        const { filePathList, fileDir, fileType, progress } = options;
        const promiseList: Promise<UploadOSSSuccess>[] = [];
        for (let index = 0; index < filePathList.length; index++) {
          const uploadPromise = new Promise<UploadOSSSuccess>((resolve, reject) => {
            const filePath = filePathList[index];
            upload({
              filePath,
              fileDir,
              fileType,
              ossts,
              progress: (pro) => {
                progress &&
                  progress({
                    filePath,
                    pro
                  });
              },
              success: ($event) => {
                resolve($event);
              },
              fail: () => {
                reject();
              }
            });
          });
          promiseList.push(uploadPromise);
        }
        Promise.allSettled(promiseList).then((res) => {
          resolve(res);
        });
      });
    });
  };

  // 上传文件
  const upload = (options: UploadFileOptions) => {
    const { filePath, fileDir, fileType, ossts, success, fail, progress } = options;
    const realFilePath = createFileKey({ filePath, fileDir, fileType });
    const { policy, Signature } = createUploadParams(ossts);
    uploadFile({
      url: ossts.domain,
      filePath,
      name: "file",
      formData: {
        key: realFilePath,
        policy: policy,
        OSSAccessKeyId: ossts.accessKeyId,
        signature: Signature,
        success_action_status: "200",
        "x-oss-security-token": ossts.securityToken
      },
      onProgressUpdate: (pro) => {
        progress && progress(pro);
      }
    }).then(
      (uploadRes) => {
        if (uploadRes.statusCode === responseStatusMap.SUCCESS) {
          success &&
            success({
              tempFilePath: filePath,
              ossPath: `${ossts.domain}/${realFilePath}`
            });
        } else {
          fail && fail();
          showToast("上传失败，请稍后重试");
        }
      },
      (err) => {
        fail && fail();
        showToast("上传失败，请稍后重试");
      }
    );
  };

  // 获取文件上传目录
  const createFileKey = (options: UploadFileNameOptions) => {
    const { filePath, fileDir, fileType } = options;
    const suffixIndex = filePath.lastIndexOf(".") + 1;
    const fileSuffix = filePath.substring(suffixIndex).toLowerCase();
    const fileName = uuid(36);
    const realFilePath = `appupload/uniapp/${fileDir}/${fileType}/${dayjs().format("YYYY-MM")}/${dayjs().format(
      "DD"
    )}/${fileName}.${fileSuffix}`;
    return realFilePath;
  };

  const createUploadParams = (ossts: AliyunOSSTSResultIF) => {
    const date = new Date();
    date.setHours(date.getHours() + 8);
    date.setMinutes(date.getMinutes() + 5);
    const expiration = date.toISOString();
    const policyText = {
      expiration: expiration,
      conditions: [["content-length-range", 0, 500 * 1024 * 1024]]
    };
    const policyBase64 = Base64.encode(JSON.stringify(policyText));
    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, ossts.accessKeySecret, {
      asBytes: true
    });
    const signature = izArrayBufferToBase64(bytes);
    return {
      policy: policyBase64,
      Signature: signature
    };
  };

  const izArrayBufferToBase64 = (buffer: any) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return Base64.encode(binary);
  };

  return {
    serializeOSSImage,
    getOSSImageInfo,
    getOSSImageListInfo,
    uploadFileList
  };
}
