## usePayment

[支付](https://uniapp.dcloud.net.cn/api/plugins/payment.html)

```ts
import { usePayment } from "@/hooks";

const { payment } = usePayment();

function pay() {
  payment(payOptions)
    .then(() => {
      // 支付成功
    })
    .catch(() => {
      // 支付失败
    });
}
```
