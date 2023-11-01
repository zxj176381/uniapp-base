## useStorage

本地缓存

### 使用方式

```typescript
import { useStorage } from "@/hooks";、

const { setStorage, getStorage, removeStorage, setGlobalData, getGlobalData  } = useStorage();

setStorage('userInfo', userInfo);
const userInfo = getUserInfo('userInfo', false); // 第二个参数传入 true/false。true表示获取缓存后删除该缓存，false为不删除。默认值为 false ，可以不传入第二个参数
removeStorage('userInfo');

setGlobalData('userInfo', userInfo);
const userInfo = getGlobalData('userInfo');
setGlobalData('userInfo', null); // 删除时这样使用
```
