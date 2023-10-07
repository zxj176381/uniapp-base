<template>
  <Layout>
    <button @click="navigateToDetail">跳转详情页</button>
    <button @click="scanCode">打开扫一扫</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <button @click="openModal">打开模态框</button>
    <CacheImage image-src="1ceshi/ceshi.jpg" width="100%" mode="widthFix" />
  </Layout>
</template>

<script lang="ts" setup>
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { useDialog, useNavigate, useShareFriend } from "@/hooks";
import routerAlias from "@/routers/alias";
import CacheImage from "@/components/CacheImage/index.vue";
import Layout from "@/components/Layout/index.vue";

const { showModal } = useDialog();
const { navigateTo } = useNavigate();

function navigateToDetail() {
  navigateTo(routerAlias["SHOP_GOODS-DETAIL"], {
    goodsID: 10
  });
}

function scanCode() {
  uni.scanCode({});
}

function openModal() {
  showModal({
    title: "提示",
    content: "内容"
  });
}

function saveDom() {
  uni
    .createSelectorQuery()
    .select("#snapshot")
    .node(() => {})
    .exec((res) => {
      const node = res[0].node;
      node.takeSnapshot({
        // type: 'file' 且 format: 'png' 时，可直接导出成临时文件
        type: "file",
        format: "png",
        success: (res: any) => {
          const f = `${wx.env.USER_DATA_PATH}/hello.png`;
          const fs = wx.getFileSystemManager();
          fs.writeFileSync(f, res.data, "binary");
          wx.showToast({
            title: "保存成功"
          });

          wx.saveImageToPhotosAlbum({
            filePath: f,
            complete(res) {
              console.log("saveImageToPhotosAlbum:", res);
            }
          });
        }
      });
    });
}

useShareFriend();
onShareAppMessage;
</script>

<style></style>
