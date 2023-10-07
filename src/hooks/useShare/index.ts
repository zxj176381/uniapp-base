import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import routerAlias from "@/routers/alias";
import { resolveAbsolutePagePath, serializeUrl } from "@/utils";
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";

export interface ShareReturn {
  title: string;
  path: string;
  imageUrl: string;
}

/**
 * @method
 * @desc 配置分享好友
 * @param {Function} callback 自定义回调
 */
export function useShareFriend(callback?: () => ShareReturn) {
  const { userInfo } = storeToRefs(useUserStore());

  onLoad(() => {
    uni.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage"]
    });
  });

  onShareAppMessage(() => {
    if (callback) {
      return callback();
    } else {
      const routerList = getCurrentPages();
      const currentRouter = routerList[routerList.length - 1];
      // @ts-ignore
      const { route, options } = currentRouter;
      const sharePath = serializeUrl(route || routerAlias.HOME_PAGE, {
        ...options,
        ...(userInfo.value
          ? {
              key: userInfo.value?.userID,
              type: "invite"
            }
          : {})
      });
      return {
        title: "标题",
        path: resolveAbsolutePagePath(sharePath),
        imageUrl: "share.jpg"
      };
    }
  });
}
