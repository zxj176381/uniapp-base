import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import dayjs from "dayjs";
import { getAliyunOSSTSService } from "@/service";

interface AliyunStateIF {
  ossInfo: AliyunOSSTSResultIF | null;
}

export const useAliyunStore = defineStore("AliyunStore", () => {
  const state: AliyunStateIF = reactive({
    ossInfo: null
  });

  const getAliyunOSSTS = () => {
    return new Promise<AliyunOSSTSResultIF>((resolve) => {
      if (state.ossInfo && checkOSSTSTimeValidity()) {
        resolve(state.ossInfo);
      } else {
        getAliyunOSSTSService().then((res) => {
          state.ossInfo = res.result;
          resolve(state.ossInfo);
        });
      }
    });
  };

  // 判断有效期
  const checkOSSTSTimeValidity = () => {
    if (state.ossInfo) {
      const expirationTime = dayjs(state.ossInfo.expiration).valueOf();
      const currentTime = dayjs().valueOf();
      if (currentTime < expirationTime - 1000 * 60 * 5) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return {
    ...toRefs(state),
    getAliyunOSSTS
  };
});
