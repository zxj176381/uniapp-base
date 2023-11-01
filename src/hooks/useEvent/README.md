## useEvent

事件总线 event-bus，用于跨页面触发事件

### 使用方式

```typescript
import { onLoad } from "@dcloudio/uni-app";
import { useEvent } from "@/hooks";

const { emitEvent, onceEvent, onEvent, offEvent } = useEvent();

onLoad(() => {
  // 监听
  onEvent("eventName", handleEvent);
  // 取消监听
  offEvent("eventName", handleEvent);
});
function handleEvent(args) {
  console.log(args);
}
function emit() {
  // 触发
  emitEvent("eventName", args);
  // 只触发一次
  onceEvent("eventName", args);
}
```
