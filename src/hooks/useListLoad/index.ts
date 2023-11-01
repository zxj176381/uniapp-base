import { reactive, toRefs } from "vue";

export function useListLoad(callback: ($event: UseListLoadCallbackOptions) => void, options?: UseListLoadOptions) {
  const state = reactive({
    pageNo: options?.pageNo || 1,
    pageSize: options?.pageSize || 10,
    loadLoading: false,
    isLoadEnd: false
  });

  function listInit() {
    state.pageNo = 1;
    callback && callback({ pageNo: state.pageNo, pageSize: state.pageSize });
  }

  function setLoadLoading(isLoading: boolean) {
    state.loadLoading = isLoading;
  }

  function setLoadEnd() {
    state.isLoadEnd = true;
  }

  function listLoad() {
    if (state.loadLoading || state.isLoadEnd) return;
    state.pageNo = state.pageNo + 1;
    setLoadLoading(true);
    callback && callback({ pageNo: state.pageNo, pageSize: state.pageSize, setLoadLoading, setLoadEnd });
  }

  return {
    ...toRefs(state),
    listInit,
    listLoad
  };
}
