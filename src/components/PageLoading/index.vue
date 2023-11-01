<template>
  <root-portal>
    <view v-if="props.visible" class="loading" :style="{ top: navbarHeight + 'px' }">
      <PageStatus status="loading" />
    </view>
  </root-portal>
</template>

<script lang="ts" setup>
import PageStatus from "@/components/PageStatus/index.vue";
import { useSystemInfo } from "@/hooks";

interface Props {
  visible?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false
});

const { navbarHeight } = useSystemInfo();
</script>

<style lang="scss">
.loading {
  position: absolute;
  z-index: 1000;
  left: 0;
  width: 100%;
}
</style>
