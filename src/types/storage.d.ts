export declare global {
  /**
   *  loginCode 微信登录获取的 code - uni.login
   */
  declare type StorageKey = "cacheImageList" | "tokenInfo" | "loginCode";
  /**
   * 图片缓存信息
   */
  declare interface CacheImageList {
    imageSrc: string;
    size: number;
  }
  /**
   * tokenInfo
   */
  declare interface TokenInfo {
    expireTime: number;
    login: boolean;
    token: string;
  }
  declare type RemoveStorage = (key: StorageKey) => void;
}
