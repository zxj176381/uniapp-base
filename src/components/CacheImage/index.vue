<template>
  <image :src="imageSrc" :mode="props.mode" :class="imageClass" />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useFileManagerStore } from "@/store";
import { computed, watch } from "vue";
import { deleteStaticUrl, resolveCacheUrl, resolveStaticUrl } from "@/utils";
import { useConsole, useFileManager } from "@/hooks";

interface ImageProps {
  imageSrc: string;
  mode?:
    | "scaleToFill"
    | "aspectFit"
    | "aspectFill"
    | "widthFix"
    | "heightFix"
    | "top"
    | "bottom"
    | "center"
    | "left"
    | "right"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
  "show-menu-by-longpress"?: boolean;
  imageClass?: string;
}
const props = defineProps<ImageProps>();

const { logError } = useConsole();
const { cacheImage } = useFileManager();
const fileManagerStore = useFileManagerStore();
const { saveImageList } = storeToRefs(fileManagerStore);

watch(
  () => props.imageSrc,
  () => {
    try {
      cacheImage(props.imageSrc);
    } catch (error) {
      logError(`@${props.imageSrc}`, error);
    }
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

<style lang="scss" scoped></style>
