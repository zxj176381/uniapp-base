## 解决组件 skyline 下 glass_easel 组件样式隔离问题，不然会有警告

glass-easel 组件框架 ，3.0+基础库，组件隔离配置必须写在 【组件.json】 内
这里临时修改源码，等待官方发布最新版修复。

修改 \node_modules\@dcloudio\uni-cli-shared\dist\json\mp\jsonFile.js 文件

```
function addMiniProgramComponentJson(filename, json) {
  // 这里给组件 json 增加一个样式隔离配置项， 感谢 zZZ1Ma 提供的方法
  json = Object.assign(json,{"styleIsolation": "apply-shared" });
  jsonComponentsCache.set(filename, json);
}
```

修改 \node_modules\\@dcloudio\uni-mp-weixin\dist\uni.mp.esm.js 文件

```
function parseComponent(vueOptions, { parse, mocks, isPage, initRelation, handleLink, initLifetimes, }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    styleIsolation: 'apply-shared',
    // addGlobalClass: true,
    pureDataPattern: /^uP$/,
  };
}
```

## 层级列表

- **navigationBar**【**899**】
