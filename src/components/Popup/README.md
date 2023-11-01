## Popup

遮罩层

### 使用方法

```js
<Popup ref="popupRef" @change="handlePopupChange">
  <view>container</view>
</Popup>;
//先引入组件
import Popup from "@/components/Popup/index.vue";
```

| 参数             | 类型    | 是否必填 | 默认值   | 说明                     |
| ---------------- | ------- | -------- | -------- | ------------------------ |
| align            | string  | false    | "bottom" | "bottom" 、 "center"     |
| isClickMaskClose | boolean | false    | true     | 是否点击 mask 关闭遮罩层 |

#### popupRef

| 方法  | 说明       |
| ----- | ---------- |
| open  | 打开遮罩层 |
| close | 关闭遮罩层 |

#### change

监听遮罩层打开关闭时间触发，返回值 ture/false true 打开 false 关闭
