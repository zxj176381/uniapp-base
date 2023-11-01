## useSystemInfo

[获取系统信息](https://uniapp.dcloud.net.cn/uni-app-x/api/get-system-info.html#getsysteminfosync)
**新增以下信息**
navbarHeight - 头部导航栏高度
menuButtonInfo - 胶囊按钮大小位置信息
mainHeight - 减去头部和底部也就是可见内容区的高度
safeAreaHeight - 底部安全区距离
safeAreaMethod - 底部安全区距离 可传入值，当为 0 时显示传入的值

### 使用方式

```typescript
import { useSystemInfo } from "@/hooks";、

const { navbarHeight } = useSystemInfo();
```
