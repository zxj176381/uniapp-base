## Popup

遮罩层

### 使用方法

```js
<Tab :tabList="tabList" :tabIndex="tabIndex" grid-type="center" @select-tab="selectSearchType" />
//先引入组件
import Tab from "@/components/Tab/index.vue";
```

| 参数         | 类型     | 是否必填 | 默认值    | 说明                          |
| ------------ | -------- | -------- | --------- | ----------------------------- |
| tabList      | AnyArray | true     | 无        | 显示的 tab 列表               |
| tabIndex     | number   | true     | 无        | 当前已选择的索引              |
| keyName      | boolean  | false    | "title"   | 显示标题的 keyName 键名       |
| gridType     | string   | false    | "default" | "default"、"center"、"bisect" |
| color        | string   | false    | "#333333" | 文字颜色                      |
| actiaveColor | string   | false    | "#201513" | 文字选中的颜色                |
| columnGap    | string   | false    | "20rpx"   | 每个 tab 的左右间距           |

#### gridType

| 方法    | 说明             |
| ------- | ---------------- |
| default | 从最左侧开始排列 |
| center  | 居中             |
| bisect  | 整行平分         |

#### select-tab

点击 tab ，返回值 index，点击的索引
