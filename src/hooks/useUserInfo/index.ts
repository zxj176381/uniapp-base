import { onLoad } from "@dcloudio/uni-app";
import { useDialog } from "../useDialog";
import { useStorage } from "../useStorage";

export function useUserInfo() {
  const { showToast } = useDialog();
  const { setStorage, getStorage } = useStorage();

  /**
   * 获取最新的登录态 code
   * @returns
   */
  const checkSession = () => {
    return new Promise<string>((resolve) => {
      uni.checkSession({
        success: () => {
          const code = getStorage("loginCode") || "";
          resolve(code);
        },
        fail: () => {
          uni.login({
            timeout: 10000,
            success: (uniLoginRes) => {
              setStorage("loginCode", uniLoginRes.code);
              resolve(uniLoginRes.code);
            }
          });
        }
      });
    });
  };

  /**
   * 获取用户登录态信息 例如 iv 等。TODO 调用接口
   * @returns
   */
  const getLoginModeInfo = () => {
    return new Promise((resolve, reject) => {
      checkSession().then((loginCode) => {});
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
    getLoginModeInfo,
    getUserProfile
  };
}
