import { reactive, toRefs, watch } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@/hooks/useStorage";
import { debounce } from "@/utils";

interface FileManagerState {
  saveImageList: CacheImageList[];
}

export const useFileManagerStore = defineStore("fileManagerSetup", () => {
  const state: FileManagerState = reactive({
    saveImageList: []
  });

  const { getStorage, setStorage } = useStorage();

  watch(
    () => state.saveImageList,
    debounce(() => {
      setStorage("cacheImageList", state.saveImageList);
    })
  );

  // 初始化列表
  const initSaveImageList = () => {
    state.saveImageList = getStorage("cacheImageList") || [];
  };

  const addSaveImage = (imageInfo: CacheImageList) => {
    state.saveImageList = [...state.saveImageList.filter((item) => item.imageSrc !== imageInfo.imageSrc), imageInfo];
  };

  return {
    ...toRefs(state),
    initSaveImageList,
    addSaveImage
  };
});
