<template>
  <view class="bubble" @click="open">
    <slot name="content"></slot>
  </view>

  <root-portal>
    <view v-if="visible" class="bubble_popup" :style="animationContainerStyle">
      <view class="mask" @click="close"></view>
      <view class="bubble_arrows" :style="arrowsLoca">
        <view class="bubble_arrows_context"></view>
      </view>
      <view class="bubble_container" :style="bubbleLoca">
        <slot name="bubble" />
      </view>
    </view>
  </root-portal>
</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance, computed, watch } from "vue";
import { useSystemInfo } from "@/hooks";
import { getElementInfoComponent } from "@/utils";

interface EmitIF {
  (event: "change", visible: boolean): void;
}
const emit = defineEmits<EmitIF>();

interface PropsIF {
  type: "top" | "right" | "bottom" | "left";
  borderRadius?: number;
  visible?: boolean;
}
const props = withDefaults(defineProps<PropsIF>(), {
  type: "top",
  borderRadius: 0,
  visible: true
});

const _that = getCurrentInstance();
const { windowWidth, windowHeight, windowTop } = useSystemInfo();

onMounted(() => {
  getBubbleContainerInfo();
});

//#region 初始化元素大小
const visible = ref(true);

watch(
  () => visible.value,
  () => {
    emit("change", visible.value);
  }
);

const bubbleContainerInfo = ref<UniApp.NodeInfo>();

function getBubbleContainerInfo() {
  // @ts-ignore
  getElementInfoComponent("bubble_container", _that?.ctx).then((size) => {
    bubbleContainerInfo.value = size;
    visible.value = false;
  });
}
//#endregion

//#region 打开popup时获取点击位置元素的位置信息，重新计算大小
const bubbleLoca = ref<{ top: string; left: string }>();
const arrowsLoca = ref<{ top: string; left: string; transform: string }>();

function open() {
  // @ts-ignore
  getElementInfoComponent("bubble", _that?.ctx).then((size) => {
    const { width: contentWidth, height: contentHeight, left: contentLeft, top: contentTop } = size;
    const { width: bubbleWidth, height: bubbleHeight } = bubbleContainerInfo.value!;
    const arrowsWidth = uni.upx2px(50);
    const arrowsHeight = uni.upx2px(20);
    let bubbleTop = 0;
    let bubbleLeft = 0;
    let arrowsTop = 0;
    let arrowsLeft = 0;
    let arrowsRotate = 0;
    switch (props.type) {
      case "bottom":
        bubbleTop = contentTop! + contentHeight!;
        bubbleLeft = (contentWidth! - bubbleWidth!) / 2 + contentLeft!;
        arrowsTop = contentTop! + contentHeight!;
        arrowsLeft = (contentWidth! - arrowsWidth) / 2 + contentLeft!;
        break;
      case "top":
        bubbleTop = contentTop! - bubbleHeight! - 10;
        bubbleLeft = (contentWidth! - bubbleWidth!) / 2 + contentLeft!;
        arrowsTop = contentTop! - arrowsHeight - 11;
        arrowsLeft = (contentWidth! - arrowsWidth) / 2 + contentLeft!;
        arrowsRotate = 180;
        break;
      case "left":
        bubbleTop = (contentHeight! - bubbleHeight!) / 2 + contentTop!;
        bubbleLeft = contentLeft! - bubbleWidth!;
        arrowsTop = (contentHeight! - arrowsHeight!) / 2 + contentTop!;
        arrowsLeft = contentLeft! - arrowsWidth + (arrowsWidth - arrowsHeight) / 2;
        arrowsRotate = 90;
        break;
      case "right":
        bubbleTop = (contentHeight! - bubbleHeight!) / 2 + contentTop!;
        bubbleLeft = contentLeft! + contentWidth!;
        arrowsTop = (contentHeight! - arrowsHeight!) / 2 + contentTop!;
        arrowsLeft = contentLeft! + contentWidth! - (arrowsWidth - arrowsHeight) / 2 + 1;
        arrowsRotate = 270;
        break;
      default:
        break;
    }
    bubbleTop = bubbleTop < 0 ? 0 : bubbleTop;
    bubbleTop = bubbleTop + bubbleHeight! > windowHeight ? windowHeight - bubbleHeight! : bubbleTop;
    bubbleLeft = bubbleLeft < 0 ? 0 : bubbleLeft;
    bubbleLeft = bubbleLeft + bubbleWidth! > windowWidth ? windowWidth - bubbleWidth! : bubbleLeft;
    bubbleLoca.value = {
      top: `${bubbleTop + windowTop}px`,
      left: `${bubbleLeft}px`
    };
    arrowsLoca.value = {
      top: `${arrowsTop + windowTop + uni.upx2px(22)}px`,
      left: `${arrowsLeft}px`,
      transform: `rotateZ(${arrowsRotate}deg)`
    };
    visible.value = true;
    setTimeout(() => {
      animationType.value = "show";
    }, 100);
  });
}

function close() {
  animationType.value = "hide";
  setTimeout(() => {
    visible.value = false;
    bubbleLoca.value = undefined;
    arrowsLoca.value = undefined;
  }, 300);
}
//#endregion

//#region 动画
const animationType = ref<"show" | "hide" | "">("");

const animationContainerStyle = computed(() => {
  if (animationType.value === "show") {
    return "opacity: 1;";
  } else if (animationType.value === "hide") {
    return "opacity: 0;";
  } else {
    return "opacity: 0;";
  }
});
//#endregion
</script>

<style lang="scss">
.bubble_popup {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 900;
  width: 100vw;
  height: 100vh;
  transition: all 0.3s;
}
.mask {
  @include break-away-document();
  width: 100%;
  height: 100%;
}
.bubble_container {
  position: absolute;
  z-index: 2;
  background-color: #fff;
  border-radius: sizing(20);
  top: sizing(999999);
  left: sizing(999999);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px sizing(20) 0px;
}
.bubble_arrows {
  position: absolute;
  top: sizing(999999);
  left: sizing(999999);
  width: sizing(50);
  height: sizing(20);
  display: flex;
  justify-content: center;
  overflow: hidden;
  z-index: 3;
  .bubble_arrows_context {
    margin-top: sizing(8);
    width: sizing(25);
    height: sizing(25);
    transform: rotateZ(45deg);
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 0px sizing(20) 0px;
  }
}
</style>
