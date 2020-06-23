<template>
  <div>
    <nav>
      <router-link class="button" to="/menu" role="button" tabindex="0">Restaurant Menu</router-link>
      <router-link class="button" to="/menu" role="button" tabindex="1">Hoe te gebruiken</router-link>
    </nav>
    <div>
      <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit"></qrcode-stream>
    </div>

    <h1 class="decode-result">
      Laatste scan:
      <br />
      <b>{{ result }}</b>
    </h1>
    
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyC7BbhS7sLqWrzId1wRr3XBMteSUe1rtz0",
  authDomain: "blind-qr-scan-app.firebaseapp.com",
  projectId: "blind-qr-scan-app"
});

const db = firebase.firestore();

export default {
  components: { QrcodeStream },

  data() {
    return {
      isValid: undefined,
      camera: "auto",
      result: null,
      voices: [],
      synth: window.speechSynthesis
    };
  },
  created: () => {},
  mounted: function() {
    setTimeout(() => {
      this.voices = this.synth.getVoices();
      console.log(this.voices);
      this.speak("Welkom in buffet restaurant 'Doe het lekker zelf'")
    }, 1000);
  },
  methods: {
    onInit(promise) {
      promise.catch(console.error).then(this.resetValidationState);
    },

    resetValidationState() {
      this.isValid = undefined;
    },

    speak(text) {
      this.synth.cancel();
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.voice = this.voices.find(v => v.lang === "nl-NL");
      this.synth.speak(utterThis);
    },

    async onDecode(content) {

      // Safari ios does not support vibrate
      if(window.navigator.vibrate){
        window.navigator.vibrate([100, 100, 100]);
      }

      this.turnCameraOff();

      // Check if code is part of our system
      if(content.includes("display")){
        var docRef = db.collection("signs").doc(content);
        try {
          const doc = await docRef.get();
          if (doc.exists) {
            console.log("Document data:", doc.data());
            this.result = doc.data().dish;
            this.speak(this.result)
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error getting document:", error);
        }
      } else {
        this.result = "Deze code is geen onderdeel van de restaurantervaring"
      }


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
h1 {
  font-weight: normal;
  margin: 10px;
  font-family: sans-serif;
  font-size: 1.5em;
  text-align: center;
}
</style>
