<template>
  <view class="navigation_bar">
    <view
      class="navigation_bar_inner"
      :class="isIOS ? 'ios' : 'android'"
      :style="navigationBarPaddingRight + safeAreaTop + backgroundColor"
    >
      <!-- 左侧按钮 -->
      <view class="navigation_bar_left" :style="navigationBarLeftContainerWidth">
        <template v-if="props.isBack">
          <view
            aria-role="button"
            aria-label="返回/首页"
            hover-class="navigation_bar_btn_active"
            hover-stay-time="100"
            class="navigation_bar_btn"
            @click="handleClickLeft"
          >
            <view class="navigation_bar_btn_icon" :class="hasLastPage ? 'back' : 'home'" :style="iconColor"></view>
          </view>
        </template>
      </view>

      <!-- 标题 -->
      <view class="navigation_bar_title">
        <view v-if="props.isLoading" class="navigation_bar_title_loading" aria-role="alert">
          <view class="loading" aria-role="loading" aria-label="加载中" :style="textColor"></view>
        </view>
        <slot name="title">
          <text :style="textColor">{{ title }}</text>
        </slot>
      </view>

      <view></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useNavigate, useSystemInfo } from "@/hooks";
import { computed } from "vue";
interface NavigationProps {
  isBack?: boolean;
  isLoading?: boolean;
  title?: string;
  color?: string;
  backgroundColor?: string;
}
const props = withDefaults(defineProps<NavigationProps>(), {
  isBack: true,
  isLoading: false,
  title: import.meta.env.VITE_APP_NAME,
  color: "rgba(0, 0, 0, 0.9)",
  backgroundColor: "#ffffff"
});

const { navigateBack, switchTab, routerAlias } = useNavigate();
const { windowWidth, menuButtonInfo, safeArea, platform } = useSystemInfo();
const isAndroid = platform === "android";
const isDevtools = platform === "devtools";
const isIOS = !isAndroid;
const navigationBarPaddingRight = `padding-right: ${windowWidth - menuButtonInfo.left}px;`;
const navigationBarLeftContainerWidth = `width: ${windowWidth - menuButtonInfo.left}px;`;
const safeAreaTop =
  isDevtools || isAndroid
    ? `height: calc(var(--height) + ${safeArea?.top || 0}px); padding-top: ${safeArea?.top || 0}px;`
    : ``;

const textColor = computed(() => {
  return `color: ${props.color};`;
});

const iconColor = computed(() => {
  return `background: ${props.color};`;
});

const backgroundColor = computed(() => {
  return `background: ${props.backgroundColor};`;
});

const hasLastPage = computed(() => {
  const routerList = getCurrentPages();
  return routerList.length > 1;
});

function handleClickLeft() {
  if (hasLastPage.value) {
    navigateBack();
  } else {
    switchTab(routerAlias.HOME_PAGE);
  }
}
</script>

<style lang="scss" scoped>
.navigation_bar {
  --height: 44px;
  --left: 16px;
  .navigation_bar_inner {
    position: relative;
    top: 0;
    left: 0;
    height: calc(var(--height) + env(safe-area-inset-top));
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: env(safe-area-inset-top);
    width: 100%;
    box-sizing: border-box;
    .navigation_bar_left {
      position: relative;
      padding-left: var(--left);
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      box-sizing: border-box;
      .navigation_bar_btn {
        padding: 10px 18px 10px 16px;
        margin: -10px -18px -10px -16px;
        .navigation_bar_btn_icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
          -webkit-mask-size: cover;
          mask-size: cover;
        }
        .home {
          -webkit-mask: url("data:image/svg+xml,%3Csvg t='1695276205929' class='icon' viewBox='0 0 1029 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='6959' width='24' height='24'%3E%3Cpath d='M79.301957 445.095715c0-150.673718 79.301957-166.53411 182.394501-229.975676C531.323111 40.655734 491.672133 24.795343 769.228982 215.120039c95.162348 63.441566 174.464305 79.301957 174.464305 229.975676 0 467.881546 39.650978 507.532524-134.813326 507.532524-182.394501 0-126.883131-63.441566-134.813327-206.185088-23.790587-206.185088-309.277632-206.185088-325.138024 15.860391-7.930196 126.883131 39.650978 190.324697-126.883131 190.324697-182.394501 0-142.743522-15.860391-142.743522-507.532524z m166.534109 578.904285c111.02274 0 174.464305-39.650978 182.394501-158.603914 0-39.650978-7.930196-118.952935 15.860392-158.603914 15.860391-39.650978 63.441566-31.720783 71.371761-31.720782 15.860391 0 55.51137 0 71.371761 31.720782 15.860391 47.581174 7.930196 118.952935 15.860392 158.603914 0 55.51137-7.930196 87.232153 39.650978 126.883131 31.720783 31.720783 95.162348 31.720783 142.743522 31.720783 158.603914 0 237.905871-7.930196 237.905871-190.324697 0-475.811741 55.51137-515.46272-198.254892-674.066633C483.741937-54.506614 531.323111-54.506614 190.324697 167.538865 79.301957 238.910627 7.930196 262.701214 7.930196 445.095715c0 499.602329-55.51137 578.904285 237.90587 578.904285z' p-id='6960'%3E%3C/path%3E%3C/svg%3E")
            no-repeat 50% 50%;
          mask: url("data:image/svg+xml,%3Csvg t='1695276205929' class='icon' viewBox='0 0 1029 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='6959' width='24' height='24'%3E%3Cpath d='M79.301957 445.095715c0-150.673718 79.301957-166.53411 182.394501-229.975676C531.323111 40.655734 491.672133 24.795343 769.228982 215.120039c95.162348 63.441566 174.464305 79.301957 174.464305 229.975676 0 467.881546 39.650978 507.532524-134.813326 507.532524-182.394501 0-126.883131-63.441566-134.813327-206.185088-23.790587-206.185088-309.277632-206.185088-325.138024 15.860391-7.930196 126.883131 39.650978 190.324697-126.883131 190.324697-182.394501 0-142.743522-15.860391-142.743522-507.532524z m166.534109 578.904285c111.02274 0 174.464305-39.650978 182.394501-158.603914 0-39.650978-7.930196-118.952935 15.860392-158.603914 15.860391-39.650978 63.441566-31.720783 71.371761-31.720782 15.860391 0 55.51137 0 71.371761 31.720782 15.860391 47.581174 7.930196 118.952935 15.860392 158.603914 0 55.51137-7.930196 87.232153 39.650978 126.883131 31.720783 31.720783 95.162348 31.720783 142.743522 31.720783 158.603914 0 237.905871-7.930196 237.905871-190.324697 0-475.811741 55.51137-515.46272-198.254892-674.066633C483.741937-54.506614 531.323111-54.506614 190.324697 167.538865 79.301957 238.910627 7.930196 262.701214 7.930196 445.095715c0 499.602329-55.51137 578.904285 237.90587 578.904285z' p-id='6960'%3E%3C/path%3E%3C/svg%3E")
            no-repeat 50% 50%;
        }
        .back {
          -webkit-mask: url("data:image/svg+xml,%3Csvg t='1695277133323' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='7200' width='24' height='24'%3E%3Cpath d='M755.882667 931.328L336.725333 512 755.882667 92.842667a34.133333 34.133333 0 0 0 0-48.469334 34.133333 34.133333 0 0 0-48.469334 0L268.117333 483.157333a34.133333 34.133333 0 0 0-9.557333 28.842667 34.133333 34.133333 0 0 0 9.557333 29.354667l439.125334 438.613333a34.133333 34.133333 0 0 0 48.64-48.64z m0 0' fill='%23333333' p-id='7201'%3E%3C/path%3E%3C/svg%3E")
            no-repeat 100% 100%;
          mask: url("data:image/svg+xml,%3Csvg t='1695277133323' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='7200' width='24' height='24'%3E%3Cpath d='M755.882667 931.328L336.725333 512 755.882667 92.842667a34.133333 34.133333 0 0 0 0-48.469334 34.133333 34.133333 0 0 0-48.469334 0L268.117333 483.157333a34.133333 34.133333 0 0 0-9.557333 28.842667 34.133333 34.133333 0 0 0 9.557333 29.354667l439.125334 438.613333a34.133333 34.133333 0 0 0 48.64-48.64z m0 0' fill='%23333333' p-id='7201'%3E%3C/path%3E%3C/svg%3E")
            no-repeat 100% 100%;
        }
      }
      .navigation_bar_btn_active {
        opacity: 0.5;
      }
    }
    .navigation_bar_title {
      font-size: 17px;
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex: 1;
      height: 100%;
      .navigation_bar_title_loading {
        margin-right: 6px;
        display: flex;
        align-items: center;
        .loading {
          font-size: 16px;
          width: 16px;
          height: 16px;
          display: block;
          background: transparent
            url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='80px' height='80px' viewBox='0 0 80 80' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Eloading%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='94.0869141%25' y1='0%25' x2='94.0869141%25' y2='90.559082%25' id='linearGradient-1'%3E%3Cstop stop-color='%23606060' stop-opacity='0' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23606060' stop-opacity='0.3' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient x1='100%25' y1='8.67370605%25' x2='100%25' y2='90.6286621%25' id='linearGradient-2'%3E%3Cstop stop-color='%23606060' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23606060' stop-opacity='0.3' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' opacity='0.9'%3E%3Cg%3E%3Cpath d='M40,0 C62.09139,0 80,17.90861 80,40 C80,62.09139 62.09139,80 40,80 L40,73 C58.2253967,73 73,58.2253967 73,40 C73,21.7746033 58.2253967,7 40,7 L40,0 Z' fill='url(%23linearGradient-1)'%3E%3C/path%3E%3Cpath d='M40,0 L40,7 C21.7746033,7 7,21.7746033 7,40 C7,58.2253967 21.7746033,73 40,73 L40,80 C17.90861,80 0,62.09139 0,40 C0,17.90861 17.90861,0 40,0 Z' fill='url(%23linearGradient-2)'%3E%3C/path%3E%3Ccircle id='Oval' fill='%23606060' cx='40.5' cy='3.5' r='3.5'%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A")
            no-repeat;
          background-size: 100%;
          margin-left: 0;
          animation: loading linear infinite 1s;
        }
      }
    }
  }
  .android {
    --height: 48px;
  }
}

@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
