import { useDialog } from "../useDialog";

const tipContent: Record<keyof AuthSetting, string> = {
  "scope.userLocation": "精确地理位置",
  "scope.userFuzzyLocation": "模糊地理位置",
  "scope.userLocationBackground": "后台定位",
  "scope.record": "麦克风",
  "scope.camera": "摄像头",
  "scope.bluetooth": "蓝牙",
  "scope.writePhotosAlbum": "添加到相册",
  "scope.addPhoneContact": "添加到联系人",
  "scope.addPhoneCalendar": "添加到日历",
  "scope.werun": "微信运动步数",
  "scope.userInfo": "用户信息",
  "scope.address": "",
  "scope.invoiceTitle": "",
  "scope.invoice": ""
};

export function useAuthorize() {
  const { showModal } = useDialog();
  /**
   * 获取系统权限 例如：相册等
   * @param scope 获取权限的类型 同 https://uniapp.dcloud.net.cn/api/other/authorize.html#scope-%E5%88%97%E8%A1%A8
   * @param success 成功回调
   * @param fail 失败回调
   */
  const authorize = ({ scope, success, fail }: AuthorizeSystemOptions) => {
    uni.getSetting({
      success: (auth) => {
        // @ts-ignore
        if (auth.authSetting[scope] === undefined) {
          uni.authorize({
            scope: scope,
            success: () => {
              success && success();
            },
            fail: () => {
              fail && fail();
            }
          });
          // @ts-ignore
        } else if (auth.authSetting[scope] === false) {
          showModal({
            content: `请在${import.meta.env.VITE_APP_NAME}小程序的“设置”选项中，允许访问你的${tipContent[scope]}`,
            confirmText: "前往",
            success: () => {
              uni.openSetting({
                success: (setAuth) => {
                  if (setAuth.authSetting[scope]) {
                    success && success();
                  } else {
                    fail && fail();
                  }
                }
              });
            },
            fail: () => {
              fail && fail();
            }
          });
        } else {
          success && success();
        }
      }
    });
  };

  return { authorize };
}
