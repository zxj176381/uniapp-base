import { storeToRefs } from "pinia";
import routerAlias from "@/routers/alias";
import routerExclude from "@/routers/exclude";
import { useUserStore } from "@/store";
import { useStorage } from "../useStorage";
import { useDialog } from "../useDialog";
import { resolveAbsolutePagePath, serializeUrl } from "@/utils";

export function useNavigate() {
  const { setGlobalData } = useStorage();
  const { showToast } = useDialog();
  const userStore = useUserStore();
  const { isLogged } = storeToRefs(userStore);

  /**
   * 跳转前检测是否有权限通过
   * @param {String} pagePath 跳转目标页面路径
   * @param {Function} callback 有权限进入之后的回调函数
   */
  const checkPermission = (type: "action" | "page", pagePath: any, callback?: () => void) => {
    let authorized = false;
    if (type === "page") {
      authorized = routerExclude.login && routerExclude.login.includes(pagePath) ? isLogged.value : true;
    } else if (type === "action") {
      authorized = isLogged.value;
    }
    if (authorized) {
      callback && callback();
    } else {
      if (callback) {
        setGlobalData("AUTH_CALLBACK", callback);
      }
    }
  };

  /**
   * 跳转到指定页面
   * @param {String} path 跳转路径
   * @param {Object} params 跳转传入的参数
   */
  const navigateTo = (path: string, params: object = {}) => {
    if (!path) {
      showToast("跳转路径不能为空");
      return;
    }
    const options = {
      url: path
    };
    // 路径转换为绝对路径
    options.url = resolveAbsolutePagePath(options.url);
    options.url = serializeUrl(options.url, params);
    checkPermission("page", path, () => {
      uni.navigateTo(options);
    });
  };

  /**
   * 关闭当前页面跳转指定页面
   * @param {String} path 跳转路径
   * @param {Object} params 跳转传入的参数
   */
  const redirectTo = (path: string, params: object = {}) => {
    if (!path) {
      showToast("跳转路径不能为空");
      return;
    }
    const options = {
      url: path
    };
    // 图片转换为绝对路径
    options.url = resolveAbsolutePagePath(options.url);
    options.url = serializeUrl(options.url, params);
    checkPermission("page", path, () => {
      uni.redirectTo(options);
    });
  };

  /**
   * 关闭之前打开的所有页面打开指定页面
   * @param {String} path 跳转路径
   * @param {Object} params 跳转传入的参数
   */
  const reLaunch = (path: string, params: object = {}) => {
    if (!path) {
      showToast("跳转路径不能为空");
      return;
    }
    const options = {
      url: path
    };
    // 图片转换为绝对路径
    options.url = resolveAbsolutePagePath(options.url);
    options.url = serializeUrl(options.url, params);
    checkPermission("page", path, () => {
      uni.reLaunch(options);
    });
  };

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
   * @param {String} path 跳转路径
   */
  const switchTab = (path: string) => {
    if (!path) {
      showToast("跳转路径不能为空");
      return;
    }
    const options = {
      url: path
    };
    // 图片转换为绝对路径
    options.url = resolveAbsolutePagePath(options.url);
    uni.switchTab(options);
  };

  /**
   * 返回页面
   * @param {Number} delta 决定返回几层页面
   */
  const navigateBack = (delta?: number) => {
    const options = {
      delta: delta || 1
    };
    uni.navigateBack(options);
  };

  return {
    routerAlias,
    navigateTo,
    redirectTo,
    reLaunch,
    switchTab,
    navigateBack
  };
}
