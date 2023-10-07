<template>
  <scroll-view scroll-y type="custom" class="page_view">
    <view v-if="rendererType === 'webview'">
      <sticky-header class="sticky_header">
        <NavigationBar />
      </sticky-header>
      <slot />
    </view>
    <template v-else>
      <sticky-header>
        <NavigationBar
          :title="props.title"
          :isBack="props.isBack"
          :isLoading="loading"
          :color="props.color"
          :backgroundColor="props.backgroundColor"
        />
      </sticky-header>
      <slot />
    </template>
  </scroll-view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useConsole } from "@/hooks";
import NavigationBar from "@/components/NavigationBar/index.vue";
import { serializeUrl } from "@/utils";
import { onLoad } from "@dcloudio/uni-app";
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

const { logInfo } = useConsole();
const rendererType = ref<"" | "skyline" | "webview">("");
//#region loading
const loading = ref(false);
function showLoading() {
  loading.value = true;
}
function hideLoading() {
  loading.value = false;
}
//#endregion

onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  // @ts-ignore
  rendererType.value = currentPage.renderer;
  // @ts-ignore
  const { route, options } = currentPage;
  logInfo(`@${serializeUrl(route!, options)}`, rendererType.value);
});

defineExpose({
  showLoading,
  hideLoading
});
</script>

<style lang="scss" scoped>
.page_view {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.sticky_header {
  display: flex;
  position: sticky;
  left: 0;
  top: 0;
  flex-direction: column;
  z-index: 899;
}
</style>
