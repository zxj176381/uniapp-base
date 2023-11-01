<template>
  <scroll-view
    v-if="!isTimeline"
    :scroll-y="props.isScroll"
    type="custom"
    enhanced
    :bounces="props.bounces"
    class="page_view"
  >
    <view v-if="rendererType === 'webview'" class="page_webview">
      <view v-if="props.isShowNavbar" :class="[props.isFixed ? 'fixed_header' : 'sticky_header']">
        <template v-if="props.customNavbarTitle">
          <NavigationBar
            :title="props.pageStatus === 'loading' ? '加载中...' : props.title"
            :isBack="props.isBack"
            :isLoading="props.pageStatus === 'loading'"
            :color="props.color"
            :backgroundColor="props.backgroundColor"
          >
            <slot name="navbarTitle" />
          </NavigationBar>
        </template>
        <template v-else>
          <NavigationBar
            :title="props.pageStatus === 'loading' ? '加载中...' : props.title"
            :isBack="props.isBack"
            :isLoading="props.pageStatus === 'loading'"
            :color="props.color"
            :backgroundColor="props.backgroundColor"
          />
        </template>
      </view>
      <template v-if="props.pageStatus === 'success'">
        <slot name="default"></slot>
      </template>
      <template v-else>
        <PageStatus :customHeight="pageStautsHeight" :status="props.pageStatus" />
      </template>
    </view>
    <template v-else>
      <sticky-header v-if="props.isShowNavbar">
        <root-portal :enable="props.isFixed">
          <template v-if="props.customNavbarTitle">
            <NavigationBar
              :title="props.pageStatus === 'loading' ? '加载中...' : props.title"
              :isBack="props.isBack"
              :isLoading="props.pageStatus === 'loading'"
              :color="props.color"
              :backgroundColor="props.backgroundColor"
            >
              <slot name="navbarTitle" />
            </NavigationBar>
          </template>
          <template v-else>
            <NavigationBar
              :title="props.pageStatus === 'loading' ? '加载中...' : props.title"
              :isBack="props.isBack"
              :isLoading="props.pageStatus === 'loading'"
              :color="props.color"
              :backgroundColor="props.backgroundColor"
            />
          </template>
        </root-portal>
      </sticky-header>
      <template v-if="props.pageStatus === 'success'">
        <slot name="default"></slot>
      </template>
      <template v-else>
        <PageStatus :customHeight="pageStautsHeight" :status="props.pageStatus" />
      </template>
    </template>
  </scroll-view>
  <view v-else class="timeline" :style="{ width: windowWidth + 'px', height: windowHeight + 'px' }">
    <view class="timeline_image">
      <CacheImage image-src="common/share_timeline.png" external:image-class="timeline_image_context" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { serializeUrl, logInfo } from "@/utils";
import NavigationBar from "@/components/NavigationBar/index.vue";
import PageStatus from "@/components/PageStatus/index.vue";
import CacheImage from "@/components/CacheImage/index.vue";
import { useSystemInfo } from "@/hooks";

interface NavigationProps {
  isShowNavbar?: boolean;
  isBack?: boolean;
  pageStatus?: PageStatus;
  title?: string;
  color?: string;
  backgroundColor?: string;
  isFixed?: boolean;
  isScroll?: boolean;
  bounces?: boolean;
  customNavbarTitle?: boolean;
}
const props = withDefaults(defineProps<NavigationProps>(), {
  isShowNavbar: true,
  isBack: true,
  pageStatus: "success",
  title: import.meta.env.VITE_APP_NAME,
  color: "rgba(0, 0, 0, 0.9)",
  backgroundColor: "#ffffff",
  isFixed: false,
  isScroll: true,
  bounces: true,
  customNavbarTitle: false
});

const rendererType = ref<"" | "skyline" | "webview">("");
const { windowWidth, windowHeight, mainHeight } = useSystemInfo();
const pageStautsHeight = computed(() => {
  return (!props.isShowNavbar || props.isFixed ? windowHeight : mainHeight) + "px";
});
const isTimeline = ref(false);

onMounted(() => {
  const appOptions = uni.getEnterOptionsSync();
  isTimeline.value = appOptions.scene === 1154;
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  // @ts-ignore
  rendererType.value = currentPage.renderer;
  // @ts-ignore
  const { route, options } = currentPage;
  logInfo(`@${serializeUrl(route!, options)}`, rendererType.value);
});
</script>

<style lang="scss">
.page_view {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  .page_webview {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
.fixed_header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 899;
}
.sticky_header {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 899;
}
.timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .timeline_image {
    position: absolute;
    bottom: sizing(20);
    .timeline_image_context {
      width: sizing(670);
      height: sizing(1072);
    }
  }
}
</style>
