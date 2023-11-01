import { isString } from "@/utils";

export function useDialog() {
  /**
   * 消息提示框
   * @param options 同 uni.showToast ，外加 string 类型，mask 默认 true
   */
  const showToast = (options: UniApp.ShowToastOptions | string) => {
    if (isString(options)) {
      options = { title: options };
    }
    options = {
      icon: "none",
      mask: true,
      ...options
    };
    /**
     * 这个地方延时为了避免 uni.hideLoading 和 uni.showToast 同时使用时，把 showToast 给删除掉Bug
     */
    setTimeout(() => {
      uni.showToast(options as UniApp.ShowToastOptions);
    }, 50);
  };

  /**
   * 模态框
   * @param options 同 uni.showModal
   */
  const showModal = (options: UniApp.ShowModalOptions) => {
    const { success, fail } = options;
    options = {
      title: "提示",
      ...options,
      success: (res) => {
        if (res.confirm) {
          success && success(res);
        }
        if (res.cancel) {
          fail && fail(res);
        }
      },
      fail: (err) => {
        fail && fail(err);
      }
    };
    uni.showModal(options);
  };

  /**
   * loading 框
   * @param options 同 uni.showLoading title 默认值为 “请稍后...” mask 默认为 true
   */
  const showLoading = (options?: UniApp.ShowLoadingOptions | string) => {
    if (isString(options)) {
      options = {
        title: options
      };
    }
    options = {
      title: "请稍后...",
      mask: true,
      ...options
    };

    uni.showLoading(options);
  };

  /**
   * 操作弹窗
   * @param options 同 uni.showActionSheet 删除 itemList 和 success 修改为 actionList【可传入对象】 和 callback【可返回对象信息】
   */
  const showActionSheet = <T extends ShowActionSheetListIF>(options: ShowActionSheetOptions<T>) => {
    const { actionList, callback } = options;
    uni.showActionSheet({
      alertText: "请选择",
      ...options,
      itemList: actionList.map((item) => {
        if (isString(item)) {
          return item;
        } else {
          return item[options.keyName];
        }
      }),
      success: (result) => {
        const selectIndex = result.tapIndex;
        const info = actionList[selectIndex];
        callback &&
          callback({
            info,
            index: selectIndex
          });
      }
    });
  };

  return {
    showToast,
    showModal,
    showLoading,
    showActionSheet
  };
}
