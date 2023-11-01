import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useFileManager } from "../useFileManager";
import { logError } from "@/utils";

export function useCacheImage(imageSrc: string) {
  const { cacheImage } = useFileManager();
  const cacheImageSrc = ref("");

  onLoad(() => {
    getCacheImage(imageSrc);
  });

  // 缓存图片
  const getCacheImage = (imageSrc: string) => {
    cacheImage(imageSrc)
      .then((info) => {
        cacheImageSrc.value = info.imageSrc;
      })
      .catch((error) => {
        logError(`@${imageSrc}`, error);
      });
  };

  return cacheImageSrc;
}
