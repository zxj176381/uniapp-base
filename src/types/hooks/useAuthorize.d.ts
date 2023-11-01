export declare global {
  interface AuthSetting extends WechatMiniprogram.AuthSetting {
    "scope.userFuzzyLocation": boolean;
    "scope.userLocationBackground": boolean;
  }

  declare interface AuthorizeSystemOptions {
    scope: keyof AuthSetting;
    success?: () => void;
    fail?: () => void;
  }
}
