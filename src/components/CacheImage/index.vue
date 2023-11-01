<template>
  <image :src="imageSrc" :mode="props.mode" class="image-class" :style="customStyle" />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useFileManagerStore } from "@/store";
import { computed, watch, type CSSProperties } from "vue";
import { deleteStaticUrl, resolveCacheUrl, resolveStaticUrl, logError } from "@/utils";
import { useFileManager } from "@/hooks";

interface ImageProps {
  imageSrc: string;
  isVerify?: false;
  "show-menu-by-longpress"?: boolean;
  mode?: ImageMode;
  customStyle?: string | CSSProperties;
}
const props = defineProps<ImageProps>();

const { cacheImage } = useFileManager();
const fileManagerStore = useFileManagerStore();
const { saveImageList } = storeToRefs(fileManagerStore);

watch(
  () => props.imageSrc,
  () => {
    cacheImage(props.imageSrc, props.isVerify).catch((error) => {
      logError(`@${props.imageSrc}`, error);
    });
  },
  {
    immediate: true
  }
);

const imageSrc = computed(() => {
  let imageSrc = "";
  try {
    const currentImage = saveImageList.value.find(
      (item) => item.imageSrc === resolveCacheUrl(deleteStaticUrl(props.imageSrc))
    );
    imageSrc = currentImage ? `${currentImage.imageSrc}` : resolveStaticUrl(props.imageSrc);
  } catch (error) {
    logError("@cacheImage", error);
    imageSrc = resolveStaticUrl(props.imageSrc);
  }
  return imageSrc;
});
</script>

<script lang="ts">
export default {
  externalClasses: ["image-class"]
};
</script>

<style lang="scss"></style>
