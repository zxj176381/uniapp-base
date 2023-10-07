export function useEvent() {
  // 监听一个事件
  const onEvent = (event: string, callback: (options?: any) => void) => {
    uni.$on(event, callback);
  };
  // 监听一个事件一次
  const onceEvent = (event: string, callback: (options?: any) => void) => {
    uni.$once(event, callback);
  };
  // 触发事件
  const emitEvent = (event: string, args?: any) => {
    uni.$emit(event, args);
  };
  // 取消监听事件
  const offEvent = (event: string, callback: (options?: any) => void) => {
    uni.$off(event, callback);
  };

  return {
    onEvent,
    onceEvent,
    emitEvent,
    offEvent
  };
}
