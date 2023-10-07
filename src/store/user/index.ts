import { defineStore, storeToRefs } from "pinia";
import { reactive, toRefs } from "vue";

export interface UserInfoIF {
  nickname: string;
  userID: number;
}

interface UserStoreIF {
  userInfo: UserInfoIF | null;
}

export const useUserStore = defineStore("userSetup", () => {
  const state: UserStoreIF = reactive({
    userInfo: null // 用户信息
  });

  return {
    ...toRefs(state)
  };
});
