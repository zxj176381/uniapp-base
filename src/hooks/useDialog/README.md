## useDialog

弹窗交互，同 uniapp 官方文档

### 使用方式

```typescript
import { useDialog } from "@/hooks";

const { showToast, showModal, showLoading, showActionSheet } = useDialog();

showToast("提示内容");

showModal({
  title: "标题",
  content: "内容",
  success: () => {
    // 点击了确认
  },
  fail: () => {
    // 点击了取消
  }
});

showLoading("加载中...");

showActionSheet<{ title: string; content: string }[]>({
  actionList: [{ title: "", content: "" }],
  success: () => {
    // 点击后回调
  },
  fail: () => {
    // 未点击回调
  }
});
```

#### showToast

可传入[`uniapp 官方的 showToast 参数`](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html), 也可以直接传入`字符串提示内容`，取消 `icon` 显示，`mask`默认为`true`。

#### showModal

[`uniapp 官方的 showModal`](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html)，`success`点击确认按钮回调，`fail`点击取消按钮的回调

#### showLoading

可传入[`uniapp 官方的 showLoading 参数`](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html), 也可以直接传入`字符串提示内容`，`mask`默认为`true`。

#### showActionSheet

[`uniapp 官方的 showActionSheet`](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showActionSheet.html)

`actionList`可传入对象和字符串，`success`返回结果有两项，`res.info`为选择的对象或者字符串，`res.index`为选择的默认值。

`success`选择某一项后的回调

`fail`未选择后的回调
