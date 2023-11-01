## useAuthorize

小程序获取系统的权限 例如：`相机`等

- 每次调用会触发用户授权界面
- 用户禁止后，每次调用会弹窗提示用户前往授权
- 用户同意后直接进入成功界面

### 使用方式

```js
import { useAuthorize } from "@/hooks";

const { authorize } = useAuthorize();

authorize({
  scope: "scope.record",
  success: () => {
    // 成功回调
  },
  fail: () => {
    // 失败回调，用户禁止获取
  }
});
```

##### authorize

| 参数    | 类型     | 是否必填 | 说明                        |
| ------- | -------- | -------- | --------------------------- |
| scope   | String   | true     | 获需要获取权限的 scope 名称 |
| success | Function | false    | 成功的回调                  |
| fail    | Function | false    | 失败的回调                  |

[点击查看 scope 可用值](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope-%E5%88%97%E8%A1%A8)
