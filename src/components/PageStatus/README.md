## PageStatus

页面状态：`loading`、`error`

### 使用方法

**无需再次引入，`Layout` 组件中已经内嵌，`PageStatus` 的 `props` 值可通过`Layout`组件直接传入**

```js
<Layout pageStatus="success">
  <view>container</view>
</Layout>;
//先引入组件
import Layout from "@/components/Layout/index.vue";
```

| 参数       | 类型   | 是否必填 | 默认值    | 说明     |
| ---------- | ------ | -------- | --------- | -------- |
| pageStatus | string | false    | "success" | 页面状态 |

#### pageStatus 有效值

| 模式   | 值      | 说明              |
| ------ | ------- | ----------------- |
| 成功   | success | 显示 slot 内容    |
| 加载中 | loading | 显示 loading 内容 |
| 失败   | error   | 显示 error 内容   |
