<template>
  <view class="image">
    <view v-if="loadStatus !== 'success'" class="image_status">
      <image v-if="loadStatus === 'loading'" :src="loadingIcon" class="loading_icon_image" />
      <view v-if="loadStatus === 'error'" class="error_text"> 图片加载失败 </view>
    </view>
    <image
      :src="props.src"
      :mode="props.mode"
      @load="imageLoad"
      @error="imageError"
      class="image_context image-class"
      :style="customStyle"
    />
    <slot v-if="loadStatus === 'success'"></slot>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, type CSSProperties } from "vue";
import loadingIcon from "@/static/common/loading.gif";

interface ImagePropsIF {
  src: string;
  mode?: ImageMode;
  customStyle?: string | CSSProperties;
}

const props = withDefaults(defineProps<ImagePropsIF>(), {
  mode: "scaleToFill",
  customStyle: ""
});

const loadStatus = ref<"loading" | "error" | "success">("loading");

watch(
  () => props.src,
  () => {
    if (props.src) {
      loadStatus.value = "loading";
    } else {
      loadStatus.value = "error";
    }
  },
  {
    immediate: true
  }
);

// 图片加载成功
const imageLoad = () => {
  loadStatus.value = "success";
};

// 图片加载失败
const imageError = () => {
  loadStatus.value = "error";
};
</script>

<script lang="ts">
export default {
  externalClasses: ["image-class"]
};
</script>

<style lang="scss">
.image {
  position: relative;
  width: 100%;
  height: 100%;
  .image_status {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e1e2e4;
    .loading_icon_image {
      width: sizing(80);
      height: sizing(72);
    }
    .error_text {
      color: #333;
      font-size: sizing(28);
    }
  }
  .image_context {
    position: relative;
    z-index: 1;
  }
}
</style>
