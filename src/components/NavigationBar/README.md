## NavigationBar

页面头部导航栏

### 使用方法

**无需再次引入，`Layout` 组件中已经内嵌，`NavigationBar` 的 `props` 值可通过`Layout`组件直接传入**

```js
<Layout title="标题内容">
  <view>container</view>
</Layout>;
//先引入组件
import Layout from "@/components/Layout/index.vue";
```

| 参数            | 类型    | 是否必填 | 默认值             | 说明                  |
| --------------- | ------- | -------- | ------------------ | --------------------- |
| isBack          | boolean | false    | true               | 是否显示返回/首页按钮 |
| title           | string  | false    | VITE_APP_NAME      | 标题内容              |
| color           | string  | false    | rgba(0, 0, 0, 0.9) | 标题颜色              |
| backgroundColor | string  | false    | #ffffff            | 头部导航栏背景色      |
| isLoading       | string  | false    | false              | 头部导航栏 loading    |
