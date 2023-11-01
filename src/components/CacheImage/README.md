## CacheImage

用户缓存本地图片，存储到 `storage`

### 使用方法

```js
	<CacheImage :image-src="imageSrc"></CacheImage>
	//先引入组件
	import CacheImage from '@/components/CacheImage/index.vue'
```

| 参数       | 类型   | 是否必填 | 说明               |
| ---------- | ------ | -------- | ------------------ |
| imageSrc   | String | true     | 本地图片路径       |
| mode       | String | false    | 同 uniapp 官方参数 |
| imageClass | String | false    | 图片 class 类名    |

mode [详情点击查看 uniapp mode 值](https://uniapp.dcloud.net.cn/component/image.html#mode-%E6%9C%89%E6%95%88%E5%80%BC)
