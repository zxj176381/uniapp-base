export function useSystemInfo() {
  const systemInfo = uni.getSystemInfoSync();
  const { safeAreaInsets } = systemInfo;
  /**
   * 胶囊按钮大小位置信息
   */
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  /**
   * 头部导航栏高度
   */
  const navbarHeight = 44 + (systemInfo.statusBarHeight || 0);
  const titleHeight = 44;
  /**
   * 可见内容区高度
   */
  const mainHeight = systemInfo.windowHeight - navbarHeight;

  const safeAreaHeight = safeAreaInsets?.bottom || 0;
  const safeAreaMethod = (paddingBottom?: number) => {
    if (safeAreaHeight) {
      return `${safeAreaHeight}px`;
    } else {
      return `${paddingBottom || 0}rpx`;
    }
  };
  return {
    ...systemInfo,
    menuButtonInfo,
    navbarHeight,
    titleHeight,
    mainHeight,
    safeAreaHeight,
    safeAreaMethod
  };
}
