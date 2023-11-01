import { useDialog } from "../useDialog";

export function usePayment() {
  const { showToast } = useDialog();

  /**
   * 支付
   * @param payOptions 同 uniapp 支付参数 https://uniapp.dcloud.net.cn/api/plugins/payment.html#requestpayment
   * @returns {Promise}
   */
  const payment = (payOptions: WechatMiniprogram.RequestPaymentOption) => {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...payOptions,
        success: () => {
          resolve(true);
        },
        fail: (error) => {
          showToast("取消支付");
          reject(error);
        }
      });
    });
  };

  return { payment };
}
