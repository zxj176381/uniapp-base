import type { AudioInfoIF } from "./types";

class InnerAudio {
  audioList: AudioInfoIF[];
  constructor() {
    this.audioList = [];
  }

  init(keyName: string) {
    if (this.audioList.some((ele) => ele.keyName === keyName)) {
      return this.audioList.find((ele) => ele.keyName === keyName)!;
    }
    const data = {
      keyName,
      audioContext: uni.createInnerAudioContext()
    };
    const { audioContext } = data;
    audioContext.onPlay(() => {
      for (let i = 0; i < this.audioList.length; i++) {
        const item = this.audioList[i];
        if (item.keyName !== keyName) {
          item.audioContext?.pause();
          return true;
        }
      }
    });
    this.audioList.push(data);
    return data;
  }

  destroy(keyName: string) {
    for (let i = 0; i < this.audioList.length; i++) {
      const item = this.audioList[i];
      if (item.keyName === keyName) {
        item.audioContext?.destroy();
        this.audioList.splice(i, 1);
        return true;
      }
    }
  }
}

const innerAudio = new InnerAudio();

export { InnerAudio, innerAudio };
