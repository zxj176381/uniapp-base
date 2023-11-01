import { logError, logInfo } from "@/utils";

function uploadFile({ url, filePath, name, header = {}, formData = {}, onProgressUpdate }: UploadData) {
  return new Promise<UniApp.UploadFileSuccessCallbackResult>((resolve, reject) => {
    const uploadTask = uni.uploadFile({
      url,
      filePath,
      name,
      header,
      formData,
      timeout: 60000,
      success: (res) => {
        if (res.statusCode === 200) {
          logInfo("@upload", `[${filePath}] to [${url}] success`, res);
          resolve(res);
        } else {
          logError("@upload", `[${filePath}] to [${url}] fail`, res);
          reject(res);
        }
      },
      fail: (err) => {
        logError("@upload", `[${filePath}] to [${url}] error`, err);
        reject(err);
      }
    });
    uploadTask.onProgressUpdate(({ progress, totalBytesSent, totalBytesExpectedToSend }) => {
      onProgressUpdate && onProgressUpdate(progress);
    });
  });
}

export default uploadFile;
