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
  declare type RemoveStorage = (key: StorageKey) => void;
  declare interface SyncExerciseCourseGroup {
    volumeMaterialId: number;
    pathName: string;
    gradeType: "X" | "Z";
  }

  /**
   * 同步练习初中字体样式
   */
  declare type SyncExerciseZFont = "font_kaiti" | "font_xingshu";

  /**
   * 视频时长缓存
   */
  declare interface VideoCacheTime {
    videoID: string;
    time: number;
  }

  /**
   * 线框
   */
  interface Rulling {
    transparent: number;
    color: string;
    style: {
      min: string;
      max: string;
    };
  }
}
