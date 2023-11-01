export function useStorage() {
  /**
   * 本地缓存添加环境，通过环境区分不同的缓存
   * @param value 本地缓存键名
   * @returns 添加当前环境后的本地缓存键名
   */
  const addEnvSuffix = (value: string) => {
    const env = import.meta.env.VITE_ENV;
    return env ? `${value}--${env}` : value;
  };

  /**
   * 设置本地缓存
   * @param key 本地缓存键名
   * @param value 缓存内容
   */
  function setStorage(key: "cacheImageList", value: CacheImageList[]): void;
  function setStorage(key: "tokenInfo", value: TokenInfo): void;
  function setStorage(key: "loginCode", value: string): void;
  function setStorage(key: "syncExerciseCourseGroup", value: SyncExerciseCourseGroup): void;
  function setStorage(key: "syncExerciseZFont", value: SyncExerciseZFont): void;
  function setStorage(key: "videoCacheTime", value: VideoCacheTime[]): void;
  function setStorage(key: "rulling", value: Rulling): void;
  function setStorage(key: string, value: any) {
    const newKey = addEnvSuffix(key);
    uni.setStorageSync(newKey, value);
  }

  /**
   * 获取本地缓存
   * @param key 本地缓存键名
   * @param remove 是否在获取完本地缓存后删除当前缓存
   * @returns 当前键名所获取到的缓存
   */
  function getStorage(key: "cacheImageList", remove?: boolean): CacheImageList[] | undefined;
  function getStorage(key: "tokenInfo", remove?: boolean): TokenInfo | undefined;
  function getStorage(key: "loginCode", remove?: boolean): string | undefined;
  function getStorage(key: "syncExerciseCourseGroup", remove?: boolean): SyncExerciseCourseGroup | undefined;
  function getStorage(key: "syncExerciseZFont", remove?: boolean): SyncExerciseZFont | undefined;
  function getStorage(key: "videoCacheTime", remove?: boolean): VideoCacheTime[] | undefined;
  function getStorage(key: "rulling", remove?: boolean): Rulling | undefined;
  function getStorage(key: string, remove = false) {
    const newKey = addEnvSuffix(key);
    const value = uni.getStorageSync(newKey);
    if (remove) {
      uni.removeStorageSync(newKey);
    }
    return value;
  }

  /**
   * 删除本地缓存
   * @param key 需要删除的本地缓存键名
   */
  const removeStorage: RemoveStorage = (key) => {
    const newKey = addEnvSuffix(key);
    uni.removeStorageSync(newKey);
  };

  /**
   * 设置全局变量
   * @param key 键名
   * @param value 键值
   */
  const setGlobalData = (key: string, value: any) => {
    const app = getApp();
    app.globalData![key] = value;
  };

  /**
   * 获取全局变量
   * @param key 键名
   * @returns 键值
   */
  const getGlobalData = (key: string) => {
    const app = getApp();
    const value = app.globalData![key];
    return value;
  };

  return {
    setStorage,
    getStorage,
    removeStorage,
    setGlobalData,
    getGlobalData
  };
}
