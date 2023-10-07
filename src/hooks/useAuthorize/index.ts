export interface AuthorizeSystemOptions {
  scope: keyof UniApp.AuthSetting;
  success?: () => void;
  fail?: () => void;
}

export function useAuthorize() {
  /**
   * 获取系统权限 例如：相册等
   * @param scope 获取权限的类型 同 https://uniapp.dcloud.net.cn/api/other/authorize.html#scope-%E5%88%97%E8%A1%A8
   * @param success 成功回调
   * @param fail 失败回调
   */
  const authorize = ({ scope, success, fail }: AuthorizeSystemOptions) => {
    uni.getSetting({
      success: (auth) => {
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
        } else if (auth.authSetting[scope] === false) {
          uni.openSetting({
            success: (setAuth) => {
              if (setAuth.authSetting[scope]) {
                success && success();
              } else {
                fail && fail();
              }
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
