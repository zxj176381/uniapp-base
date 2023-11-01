import { reactive, toRefs, watch } from "vue";
import { defineStore } from "pinia";
import { getUserInfoService, getUserPropertyService } from "@/service";
import { logInfo } from "@/utils";
import { responseStatusMap } from "@/service/request/constants";

interface UserStoreIF {
  userInfo: (UserInfoResult & UserPropertyResult) | null;
}

export const useUserStore = defineStore("userSetup", () => {
  const state: UserStoreIF = reactive({
    userInfo: null // 用户信息
  });

  const getUserInfo = () => {
    return new Promise((resolve, reject) => {
      const data = {
        appid: import.meta.env.VITE_WECHAT_APPID
      };
      getUserInfoService(data)
        .then((userInfoRes) => {
          if (userInfoRes._status === responseStatusMap.SUCCESS) {
            getUserProperty(userInfoRes.result)
              .then(() => {
                resolve(true);
              })
              .catch(() => reject());
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  const getUserProperty = (userInfo: UserInfoResult) => {
    return new Promise((reolve, reject) => {
      const { userId } = userInfo;
      getUserPropertyService({}, { userId })
        .then((infoRes) => {
          if (infoRes._status === responseStatusMap.SUCCESS) {
            state.userInfo = {
              ...infoRes.result,
              ...userInfo
            };
            logInfo("@userInfo", state.userInfo);
            reolve(true);
          } else {
            reject();
          }
        })
        .catch(() => reject());
    });
  };

  return {
    ...toRefs(state),
    getUserInfo
  };
});
