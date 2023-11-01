import { onLoad, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import routerAlias from "@/routers/alias";
import { resolveAbsolutePagePath, resolveStaticUrl, serializeUrl } from "@/utils";
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";

export interface ShareReturn {
  title: string;
  path: string;
  imageUrl: string;
}

export interface ShareTimelineReturn {
  title: string;
  query: string;
  imageUrl: string;
}

/**
 * @method
 * @desc 配置分享好友
 * @param {Function} callback 自定义回调
 */
export function useShareFriend(callback?: () => ShareReturn) {
  const { userInfo } = storeToRefs(useUserStore());

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
              key: userInfo.value?.userId,
              type: "invite"
            }
          : {})
      });
      return {
        title: `${import.meta.env.VITE_APP_NAME}，随身书法课堂，让你轻松写好字。`,
        path: resolveAbsolutePagePath(sharePath),
        imageUrl: resolveStaticUrl("common/share.jpg")
      };
    }
  });
}

export function useShareTimeline(callback?: () => ShareTimelineReturn) {
  const { userInfo } = storeToRefs(useUserStore());
  onShareTimeline(() => {
    if (callback) {
      return callback();
    } else {
      const routerList = getCurrentPages();
      const currentRouter = routerList[routerList.length - 1];
      // @ts-ignore
      const { options } = currentRouter;
      const userInviteInfo = userInfo.value
        ? {
            key: userInfo.value?.userId,
            type: "invite"
          }
        : {};
      return {
        title: `${import.meta.env.VITE_APP_NAME}，随身书法课堂，让你轻松写好字。`,
        query: serializeUrl("", { ...options, ...userInviteInfo }).replace("?", ""),
        imageUrl: resolveStaticUrl("common/share.jpg")
      };
    }
  });
}
