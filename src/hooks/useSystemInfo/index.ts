export function useSystemInfo() {
  const systemInfo = uni.getSystemInfoSync();
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  return {
    ...systemInfo,
    menuButtonInfo
  };
}
