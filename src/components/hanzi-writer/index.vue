<template>
  <view>
    <hanzi-writer :id="type + 'hz-writer' + hanziID" :width="widthToPx" :height="heightToPx"></hanzi-writer>
  </view>
</template>

<script>
import createHanziWriterContext from "@/wxcomponents/hanzi-writer-miniprogram/index.js";
import { toRaw } from "vue";

export default {
  props: {
    hanziCode: {
      type: String,
      default: ""
    },
    hanziID: {
      default: 0
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    active: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Number,
      default: 8
    },
    type: {
      type: String,
      default: "swiper"
    },
    strokeColor: {
      type: String,
      default: "#ffffff"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      writerCtx: null
    };
  },
  watch: {
    active: {
      handler() {
        const writerCtx = toRaw(this.writerCtx);
        if (this.type === "swiper" && writerCtx) {
          if (this.active) {
            writerCtx.updateColor("strokeColor", "#D25F3A");
            writerCtx.updateColor("radicalColor", "#D25F3A");
          } else {
            writerCtx.updateColor("strokeColor", "#ffffff");
            writerCtx.updateColor("radicalColor", "#ffffff");
          }
        }
      }
    },
    hanziCode: {
      handler() {
        const writerCtx = toRaw(this.writerCtx);
        writerCtx.setCharacter(this.hanziCode);
        if (this.type === "loop") {
          this.loop();
        }
      }
    },
    loading: {
      handler() {
        const writerCtx = toRaw(this.writerCtx);
        if (writerCtx) {
          if (this.loading) {
            writerCtx.hideCharacter({
              duration: 0
            });
            writerCtx.hideOutline({
              duration: 0
            });
          } else {
            writerCtx.showCharacter({
              duration: 0
            });
            writerCtx.showOutline({
              duration: 0
            });
          }
        }
      }
    }
  },
  computed: {
    widthToPx() {
      return uni.upx2px(this.width);
    },
    heightToPx() {
      return uni.upx2px(this.height);
    }
  },
  mounted() {
    this.initHanziWriter();
  },
  methods: {
    initHanziWriter() {
      wx.nextTick(() => {
        this.writerCtx = createHanziWriterContext({
          id: this.type + "hz-writer" + this.hanziID,
          character: this.hanziCode,
          padding: this.padding,
          strokeColor: this.strokeColor,
          delayBetweenStrokes: 0,
          delayBetweenLoops: 1000,
          strokeAnimationSpeed: 0.3,
          outlineColor: "#fff",
          showOutline: this.type === "dictation" ? false : true,
          page: this
        });
        const writerCtx = toRaw(this.writerCtx);
        if (this.type === "swiper" && this.active) {
          writerCtx.updateColor("strokeColor", "#D25F3A");
          writerCtx.updateColor("radicalColor", "#D25F3A");
        }
        if (this.type === "loop") {
          writerCtx.loopCharacterAnimation();
        }
        if (this.type === "wordGx") {
          writerCtx.quiz();
        }
        if (this.type === "dictation") {
          writerCtx.hideCharacter({
            duration: 0
          });
        }
      });
    },
    quiz(isShowCharacter) {
      const writerCtx = toRaw(this.writerCtx);
      if (isShowCharacter) {
        writerCtx.hideOutline();
      } else {
        writerCtx.showOutline();
      }
      writerCtx.quiz();
    },
    cancelQuiz() {
      const writerCtx = toRaw(this.writerCtx);
      writerCtx.cancelQuiz();
      writerCtx.showCharacter();
    },
    changeShowStatus(isShow) {
      const writerCtx = toRaw(this.writerCtx);
      if (isShow) {
        writerCtx.showCharacter();
      } else {
        writerCtx.hideCharacter();
      }
    },
    loop() {
      const writerCtx = toRaw(this.writerCtx);
      writerCtx.loopCharacterAnimation();
    }
  }
};
</script>

<style lang="scss" scoped></style>
