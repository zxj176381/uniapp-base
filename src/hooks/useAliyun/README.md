## useAliyun

阿里云

### 使用方式

```js
import { useAliyun } from "@/hooks";

const { serializeOSSImage, getOSSImageInfo } = useAliyun();
```

##### serializeOSSImage

用户`阿里云OSS`图片处理的参数

| 参数        | 类型   | 是否必填 | 说明                  |
| ----------- | ------ | -------- | --------------------- |
| filePath    | String | true     | OSS 图片全路径        |
| optionsList | Array  | false    | 同阿里云 OSS 官方参数 |

[点击前往查看官方图像处理参数](https://help.aliyun.com/zh/oss/user-guide/img-parameters/?spm=a2c4g.11186623.0.0.42a2327aw1e1cb)

optionsList 参数例子

```js
// dispose 操作的名称 例如：缩放：resize 可传入多个对象
serializeOSSImage("oss图片路径", [{ dispose: "resize", m: "lfit" }]);
```

#### getOSSImageInfo

获取 OSS 中图片的信息

```js
getOSSImageInfo("oss图片路径").then((info) => {
  console.log(info); // 图片信息
});
```
