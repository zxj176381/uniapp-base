<template>
  <root-portal>
    <view v-if="isShow" class="popup" :style="popupStyle">
      <view class="mask" :style="animationMaskStyle" @click="close"></view>
      <view class="container" :style="animationContainerStyle">
        <slot />
      </view>
    </view>
  </root-portal>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from "vue";

interface Props {
  align: "center" | "bottom";
  isClickMaskClose: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  align: "bottom",
  isClickMaskClose: true
});

interface Emit {
  (event: "change", isShow: boolean): void;
}

const emit = defineEmits<Emit>();

const popupStyle = computed(() => {
  if (props.align === "bottom") {
    return "align-items: flex-end;";
  } else if (props.align === "center") {
    return "justify-content: center;align-items: center;";
  }
});

//#region 动画
const animationType = ref<"show" | "hide" | "">("");

const animationMaskStyle = computed(() => {
  if (animationType.value === "show") {
    return "opacity: 1;";
  } else if (animationType.value === "hide") {
    return "opacity: 0;";
  } else {
    return "opacity: 0;";
  }
});

const animationContainerStyle = computed(() => {
  if (props.align === "center") {
    if (animationType.value === "show") {
      return "opacity: 1;";
    } else if (animationType.value === "hide") {
      return "opacity: 0;";
    } else {
      return "opacity: 0;";
    }
  } else {
    if (animationType.value === "show") {
      return "transform: translateY(0%);";
    } else if (animationType.value === "hide") {
      return "transform: translateY(100%);";
    } else {
      return "transform: translateY(100%);";
    }
  }
});
//#endregion

//#region 显示/隐藏
const isShow = ref(false);
watch(
  () => isShow.value,
  () => {
    emit("change", isShow.value);
  }
);
function open() {
  isShow.value = true;
  setTimeout(() => {
    animationType.value = "show";
  }, 100);
}
function close() {
  animationType.value = "hide";
  setTimeout(() => {
    isShow.value = false;
  }, 300);
}
//#endregion

defineExpose({
  open,
  close
});
</script>

<style lang="scss">
.popup {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 910;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background: rgba(51, 51, 51, 0.65);
    transition: all 0.3s;
  }
  .container {
    width: 100%;
    position: relative;
    z-index: 2;
    transition: all 0.3s;
  }
}
</style>
