## useUserInfo

### 使用方式

```typescript
import { useLoginLoad } from "@/hooks";、

// 在登录成功后，并且获取到用户信息后再进行页面初始化
// 为了保证，打开每个页面都时已经登录成功并且有用户信息后再执行页面
// 当 isSuccess 为 true 时，说明登录成功，false 失败
useLoginLoad((pageOptions, isSuccess) => {
  // pageOptions 页面跳转参数
});
// or
const { validityLogin } = useLoginLoad();

function onClick () {
  validityLogin(() => {
    // 操作时先执行登录和获取用户信息再执行
  })
}

```
