<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useFileManagerStore } from "./store";

const { initSaveImageList } = useFileManagerStore();

onLaunch(() => {
  initSaveImageList();
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
image {
  display: block;
}
</style>
