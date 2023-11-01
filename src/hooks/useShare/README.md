## useShare

页面分享

### 使用方式

```typescript
import { onShareAppMessage } from "@dcloudio/uni-app";
import { useShareFriend } from "@/hooks";、

useShareFriend(() => {
  return {
    title: '',
    path: '',
    imageUrl: ''
  }
})
// or
useShareFriend();
// 必须引入 onShareAppMessage，否则 uniapp 默认未导入分享功能不生效。
onShareAppMessage;
```

**内部有默认值，回调函数可传入也可以不传入，默认为当前页面路径以及参数**
