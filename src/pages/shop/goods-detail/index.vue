<template>
  <Layout>
    <view class="goods-detail"> view12312313 </view>
  </Layout>
</template>

<script lang="ts" setup>
import { onShareAppMessage } from "@dcloudio/uni-app";
import Layout from "@/components/Layout/index.vue";
import { useShareFriend } from "@/hooks";

useShareFriend();
onShareAppMessage;
</script>

<style lang="scss" scoped></style>
