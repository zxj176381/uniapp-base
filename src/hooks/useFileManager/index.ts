import { resolveStaticUrl, resolveCacheUrl, deleteStaticUrl } from "@/utils/media";
import { useAliyun } from "../useAliyun";
import { useFileManagerStore } from "@/store";
import { storeToRefs } from "pinia";

export function useFileManager() {
  const { getOSSImageInfo } = useAliyun();
  const fileManagerStore = useFileManagerStore();
  const { addSaveImage } = fileManagerStore;
  const { saveImageList } = storeToRefs(fileManagerStore);

  const fs = uni.getFileSystemManager();

  /**
   * 缓存图片
   * @param imageSrc
   * @returns
   */
  const cacheImage = (imageSrc: string, isVerify = false) => {
    imageSrc = deleteStaticUrl(imageSrc);
    return new Promise<CacheImageList>((resolve, reject) => {
      if (imageSrc) {
        const cacheImageList = saveImageList.value;
        if (cacheImageList) {
          const currentImageInfo = cacheImageList.find((item) => item.imageSrc === resolveCacheUrl(imageSrc));
          if (currentImageInfo) {
            // 校验图片是否在文件系统中存在
            checkFileExists(imageSrc)
              .then(() => {
                // 校验两张图片size 是否相同 相同的话不管 不相同替换
                // 新的图片使用 OSS 获取图片信息 好处 资源小，不用获取原始图片
                if (isVerify) {
                  getOSSImageInfo(resolveStaticUrl(imageSrc)).then((newCacheImageInfo) => {
                    if (Number(newCacheImageInfo!.FileSize.value) === currentImageInfo.size) {
                      resolve(currentImageInfo);
                    } else {
                      savaImageFile(imageSrc).then(
                        (imageInfo) => {
                          resolve(imageInfo);
                        },
                        (error) => {
                          reject(error);
                        }
                      );
                    }
                  });
                } else {
                  resolve(currentImageInfo);
                }
              })
              .catch(() => {
                savaImageFile(imageSrc).then(
                  (imageInfo) => {
                    resolve(imageInfo);
                  },
                  (error) => {
                    reject(error);
                  }
                );
              });
          } else {
            savaImageFile(imageSrc).then(
              (imageInfo) => {
                resolve(imageInfo);
              },
              (error) => {
                reject(error);
              }
            );
          }
        } else {
          savaImageFile(imageSrc).then(
            (imageInfo) => {
              resolve(imageInfo);
            },
            (error) => {
              reject(error);
            }
          );
        }
      } else {
        reject("图片路径不可为空");
      }
    });
  };

  /**
   * 保存图片到本地
   * @param imageSrc 远程图片地址
   * @returns
   */
  const savaImageFile: SaveFile = (imageSrc) => {
    return new Promise((resolve, reject) => {
      getImageInfo(imageSrc).then(
        (info) => {
          const dirPath = imageSrc.substring(0, imageSrc.lastIndexOf("/"));
          checkDirExists(dirPath).then(() => {
            const cacheImageSrc = resolveCacheUrl(imageSrc);
            fs.saveFile({
              tempFilePath: info.path,
              filePath: cacheImageSrc,
              success: () => {
                getCacheImageInfo(cacheImageSrc).then((imageSize) => {
                  const cacheImageInfo = {
                    imageSrc: cacheImageSrc,
                    size: imageSize
                  };
                  addSaveImage(cacheImageInfo);
                  resolve(cacheImageInfo);
                });
              },
              fail: () => {
                reject({
                  status: "500",
                  message: "保存图片失败"
                });
              }
            });
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  /**
   * 检查保存时目录是否存在，不存在创建 存在继续
   * @param dirPath
   * @returns
   */
  const checkDirExists = (dirPath: string) => {
    return new Promise((resolve) => {
      fs.access({
        path: resolveCacheUrl(dirPath),
        success: () => {
          resolve(true);
        },
        fail: (error) => {
          fs.mkdir({
            dirPath: resolveCacheUrl(dirPath),
            recursive: true,
            success: () => {
              resolve(true);
            },
            fail: () => {
              resolve(true);
            }
          });
        }
      });
    });
  };

  /**
   * 检查文件是否存在，用于处理 缓存中有图片，但是文件系统里没有时重新创建
   */
  const checkFileExists = (filePath: string) => {
    return new Promise<boolean>((resolve, reject) => {
      fs.access({
        path: resolveCacheUrl(filePath),
        success: () => {
          resolve(true);
        },
        fail: (error) => {
          reject();
        }
      });
    });
  };

  /**
   * 获取本地缓存图片的大小
   * @param imageSrc 半路径
   * @returns
   */
  const getCacheImageInfo = (imageSrc: string) => {
    return new Promise<UniApp.GetFileInfoSuccessCallbackResult["size"]>((resolve, reject) => {
      fs.getFileInfo({
        filePath: resolveCacheUrl(imageSrc),
        success: (imageInfo) => {
          resolve(imageInfo.size);
        },
        fail: () => {
          reject();
        }
      });
    });
  };

  /**
   * 获取图片信息，包含 宽高以及本地图片路径
   * @param imageSrc
   * @returns
   */
  const getImageInfo = (imageSrc: string) => {
    return new Promise<GetImageInfoSuccessData>((resolve, reject) => {
      const realImageSrc = resolveStaticUrl(imageSrc);
      uni.getImageInfo({
        src: realImageSrc,
        success: (imageInfo) => {
          const fileName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
          resolve({ ...imageInfo, fileName, imageSrc });
        },
        fail: () => {
          reject({
            status: 500,
            message: "该图片不存在"
          });
        }
      });
    });
  };

  return {
    cacheImage
  };
}
