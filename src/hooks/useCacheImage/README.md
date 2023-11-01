## useCacheImage

缓存图片 hooks 版本
用于解决 for 循环时，多次调用的问题

### 使用方式

```typescript
<image :src="icon" />

import { useCacheImage } from "@/hooks";

const icon = useCacheImage('imageSrc')
```
