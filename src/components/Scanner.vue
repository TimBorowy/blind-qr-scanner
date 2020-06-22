<template>
  <div>
    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit"></qrcode-stream>

    <p class="decode-result">
      Laatste scan: <br>
      <b>{{ result }}</b>
    </p>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

const synth = window.speechSynthesis;
const mapping = [{ display_id: "display_1", dish: "Gebakken aardappeltjes" }];
let voices;

setTimeout(() => {
  voices = synth.getVoices();
  console.log(voices);

  const utterThis = new SpeechSynthesisUtterance(
    "Welkom in buffet restaurant 'Doe het lekker zelf' "
  );
  utterThis.voice = voices.find(v => v.lang === "nl-NL");
  synth.speak(utterThis);
}, 1050);

export default {
  components: { QrcodeStream },

  data() {
    return {
      isValid: undefined,
      camera: "auto",
      result: null
    };
  },
  methods: {
    onInit(promise) {
      promise.catch(console.error).then(this.resetValidationState);
    },

    resetValidationState() {
      this.isValid = undefined;
    },

    async onDecode(content) {
      window.navigator.vibrate([100, 100, 100]);
      this.turnCameraOff();

      const dishResult = mapping.find(d => d.display_id === content);
      console.log(dishResult);
      this.result = dishResult.dish;

      synth.cancel();
      const utterThis = new SpeechSynthesisUtterance(dishResult.dish);
      utterThis.voice = voices.find(v => v.lang === "nl-NL");
      synth.speak(utterThis);

      // Add some delay so multiple scans are prevented
      await this.timeout(750);

      this.turnCameraOn();
    },

    turnCameraOn() {
      this.camera = "auto";
    },

    turnCameraOff() {
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  width: 100%;
}
p {
  font-family: sans-serif;
  font-size: 2em;
  text-align: center;
}
</style>
