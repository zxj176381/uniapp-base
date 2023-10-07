import { useDialog } from "../useDialog";

export function usePayment() {
  const { showLoading, showToast } = useDialog();

  /**
   * 支付
   * @param payOptions 同 uniapp 支付参数 https://uniapp.dcloud.net.cn/api/plugins/payment.html#requestpayment
   * @returns {Promise}
   */
  const payment = (payOptions: UniApp.RequestPaymentOptions) => {
    return new Promise((resolve, reject) => {
      showLoading("正在支付中...");
      uni.requestPayment({
        ...payOptions,
        success: () => {
          uni.hideLoading();
          resolve(true);
        },
        fail: (error) => {
          uni.hideLoading();
          showToast("取消支付");
          reject(error);
        }
      });
    });
  };

  return { payment };
}
