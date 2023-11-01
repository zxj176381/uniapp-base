import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { useUserStore } from "@/store";
import { useStorage } from "../useStorage";
import { useDialog } from "../useDialog";
import { getBaseTokenService, quietLoginService, updateLoginTokenService } from "@/service";
import { responseStatusMap } from "@/service/request/constants";

/**
 * 每个页面的初始化时/用户操作时，需要用户信息时，通过该函数返回出去的 validityLogin 方法，该方法的回调函数执行则是获取到最新的 token 后执行的函数
 * @returns
 */
export function useLoginLoad(hook?: (options: AnyObject, isSuccess: boolean) => void) {
  const { showToast } = useDialog();
  const { getStorage, setStorage } = useStorage();
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);
  const { getUserInfo } = userStore;

  // 页面携带参数
  const pageOptions = ref();

  onLoad((options) => {
    pageOptions.value = options;
    login(hook);
  });

  /**
   * 校验登录状态
   */
  const login = (hook?: (options: AnyObject, isSuccess: boolean) => void) => {
    const tokenInfo = getStorage("tokenInfo");
    if (tokenInfo && tokenInfo.login) {
      // 校验 token 是否过期
      const isValidity = checkTokenValidity(tokenInfo);
      if (isValidity) {
        // 已过期，获取新的token
        updateLoginTokenService().then((updateRes) => {
          if (updateRes._status === responseStatusMap.SUCCESS) {
            setStorage("tokenInfo", updateRes.result);
            checkUserInfo()
              .then(() => {
                hook && hook(pageOptions.value, true);
              })
              .catch(() => {
                hook && hook(pageOptions.value, false);
              });
          } else {
            hook && hook(pageOptions.value, false);
          }
        });
      } else {
        // 未过期
        checkUserInfo()
          .then(() => {
            hook && hook(pageOptions.value, true);
          })
          .catch(() => {
            hook && hook(pageOptions.value, false);
          });
      }
    } else {
      // 没有 token 时获取游客 token 然后进行登录
      getBaseToken()
        .then(() => {
          // 静默登录
          quietLogin()
            .then(() => {
              // 获取用户信息
              checkUserInfo()
                .then(() => {
                  hook && hook(pageOptions.value, true);
                })
                .catch(() => {
                  hook && hook(pageOptions.value, false);
                });
            })
            .catch(() => {
              hook && hook(pageOptions.value, false);
            });
        })
        .catch(() => {
          hook && hook(pageOptions.value, false);
        });
    }
  };

  /**
   * 校验是否有用户信息
   */
  const checkUserInfo = () => {
    return new Promise((resolve, reject) => {
      if (userInfo.value) {
        resolve(true);
      } else {
        getUserInfo()
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            reject();
          });
      }
    });
  };

  /**
   * 静默登录
   */
  const quietLogin = () => {
    return new Promise((resolve, reject) => {
      getWechatCode().then((wechatCode) => {
        const data: QuietLoginData = {
          appId: import.meta.env.VITE_WECHAT_APPID,
          code: wechatCode
        };
        quietLoginService(data)
          .then((loginRes) => {
            if (loginRes._status === responseStatusMap.SUCCESS) {
              setStorage("tokenInfo", loginRes.result.token);
              resolve(true);
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });
    });
  };

  /**
   * 校验 token 有效性
   * 返回值 false - 未过期； true - 已过期/不存在
   */
  const checkTokenValidity = (tokenInfo: TokenInfo) => {
    if (tokenInfo) {
      const tokenExpireTime = tokenInfo.expireTime;
      const currentTime = dayjs().valueOf();
      if (tokenExpireTime - 1000 * 60 * 5 <= currentTime) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  /**
   * 获取游客token
   */
  const getBaseToken = () => {
    return new Promise((resolve, reject) => {
      getBaseTokenService()
        .then((tokenRes) => {
          if (tokenRes._status === responseStatusMap.SUCCESS) {
            setStorage("tokenInfo", tokenRes.result);
            resolve(true);
          } else {
            reject();
          }
        })
        .catch(() => reject());
    });
  };

  /**
   * 获取最新的登录态 code。
   * @returns
   */
  const getWechatCode = () => {
    return new Promise<string>((resolve) => {
      uni.login({
        timeout: 10000,
        success: (uniLoginRes) => {
          resolve(uniLoginRes.code);
        },
        fail: (error) => {}
      });
    });
  };

  /**
   * 获取用户信息【必须在用户点击后调用】
   * https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html
   * @returns 用户信息
   */
  const getUserProfile = () => {
    return new Promise<UniApp.GetUserProfileRes>((resolve, reject) => {
      uni.getUserProfile({
        lang: "zh_CN",
        desc: "用于用户在各个模块中快速的找到自己，以及分享自己的成果！",
        success: (profileRes) => {
          resolve(profileRes);
        },
        fail: () => {
          reject();
          showToast("取消获取用户信息");
        }
      });
    });
  };

  return {
    validityLogin: login,
    getUserProfile
  };
}
