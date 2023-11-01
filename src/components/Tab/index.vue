<template>
  <scroll-view type="custom" scroll-x enhanced :show-scrollbar="false" enable-flex class="scroll_view">
    <view :style="gridStyle" class="list_view">
      <view
        v-for="(item, index) in props.tabList"
        :key="index"
        :style="gridItemStyle"
        class="view_item"
        @click="selectTab(index)"
      >
        <view :class="['view_item_title', props.tabIndex === index ? 'view_item_title_active' : '']">
          {{ item[props.keyName] }}
        </view>
        <view
          :class="['view_item_bar', props.tabIndex === index ? 'view_item_bar_active' : '']"
          :style="{
            background: props.barColor
          }"
        ></view>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  tabList: any[];
  tabIndex: number;
  keyName: string;
  gridType?: "default" | "center" | "bisect";
  color?: string;
  actiaveColor?: string;
  barColor?: string;
  columnGap?: string;
}
const props = withDefaults(defineProps<Props>(), {
  gridType: "default",
  keyName: "title",
  color: "#333333",
  actiaveColor: "#201513",
  columnGap: "20rpx",
  barColor: "linear-gradient(-90deg, #ccc7ae 0%, #a2c5bf 100%)"
});

interface Emit {
  (event: "selectTab", index: number): void;
}
const emit = defineEmits<Emit>();

const gridStyle = computed(() => {
  let layout = "";
  if (props.gridType === "default") {
    layout = "";
  } else if (props.gridType === "center") {
    layout = "width: 100%;justify-content: center;";
  } else if (props.gridType === "bisect") {
    layout = "width: 100%;justify-content: space-around;";
  }
  return `${layout}`;
});

const gridItemStyle = computed(() => {
  return `color: ${props.color};padding: 0 ${props.columnGap};`;
});

function selectTab(index: number) {
  emit("selectTab", index);
}
</script>

<style lang="scss">
.scroll_view {
  width: 100%;
  height: sizing(80);
  .list_view {
    display: flex;
    flex-direction: row;
    padding: 0 sizing(20);
    box-sizing: border-box;
    .view_item {
      line-height: sizing(80);
      font-size: sizing(28);
      position: relative;
      display: flex;
      justify-content: center;
    }
    .view_item_title {
      color: #333;
      transition: all 0.2s;
    }
    .view_item_title_active {
      font-weight: bold;
      font-size: #201513;
    }
    .view_item_bar {
      position: absolute;
      bottom: sizing(10);
      width: sizing(40);
      height: sizing(4);
      border-radius: sizing(2);
      opacity: 0;
      transition: all 0.2s;
    }
    .view_item_bar_active {
      opacity: 1;
    }
  }
}
</style>
