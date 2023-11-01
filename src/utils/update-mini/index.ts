export function updateMini() {
  const updateManager = uni.getUpdateManager();
  if (updateManager) {
    updateManager.onCheckForUpdate((res) => {});

    // 小程序有新版本，则静默下载新版本，做好更新准备
    updateManager.onUpdateReady((updateRes) => {
      uni.showModal({
        title: "更新提示",
        content: "新版本已经准备好，点击确定重新启动",
        showCancel: false,
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });

    updateManager.onUpdateFailed(function (res) {
      // 新的版本下载失败
      uni.showModal({
        title: "已经有新版本了哟~",
        content: "新版本已经准备好，点击确定重新启动",
        showCancel: false,
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });
  }
}
