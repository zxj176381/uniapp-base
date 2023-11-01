## useNavigate

路由跳转

### 使用方式

```typescript
import { useNavigate } from "@/hooks";

const { routerAlias, navigateTo, redirectTo, reLaunch, switchTab, navigateBack } = useNavigate();

function jumpRouter() {
  // 跳转指定页面
  navigateTo(routerAlias["页面路径"], { ID: 1 });
  // 关闭当前页跳转指定页面
  redirectTo(routerAlias["页面路径"], { ID: 1 });
  // 关闭所有页面跳转指定页面
  reLaunch(routerAlias["页面路径"], { ID: 1 });
  // 跳转标签栏页面
  switchTab(routerAlias["页面路径"]);
  // 返回上一页
  navigateBack();
}
```

#### navigateTo redirectTo reLaunch

| 参数     | 类型   | 是否必填 | 默认值 | 说明                      |
| -------- | ------ | -------- | ------ | ------------------------- |
| pagePath | string | true     | 无     | 具体查看 routers/alias.ts |
| options  | object | false    | 无     | 跳转传入的参数            |
