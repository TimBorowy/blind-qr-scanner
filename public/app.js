import QrScanner from '/qr-scanner/qr-scanner.min.js';
QrScanner.WORKER_PATH = '/qr-scanner/qr-scanner-worker.min.js';

const videoElem = document.querySelector("video")
const resultfield = document.getElementById('result-field');
const synth = window.speechSynthesis;
const mapping = [
  {display_id: "display_1", dish: "Gebakken aardappeltjes"} 
]
let voices

QrScanner.hasCamera().then(hasCamera => {
  console.log("Has camera: ", hasCamera);
});
setTimeout(() => {
  voices = synth.getVoices();
  console.log(voices)
  
  const utterThis = new SpeechSynthesisUtterance("Hallo Tim");
  utterThis.voice = voices.find(v => v.lang === "nl-NL" )
  synth.speak(utterThis);

}, 1050)


const qrScanner = new QrScanner(videoElem, result => resultHandler(result, resultfield));
qrScanner.setInversionMode("both");
qrScanner.start();

function resultHandler(result, label) {
  const dishResult = mapping.find(d => d.display_id === result)
  console.log(dishResult)

  console.log(result)
  label.textContent = dishResult.dish;
  label.style.color = 'teal';
  clearTimeout(label.highlightTimeout);
  label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);

  synth.cancel();
  const utterThis = new SpeechSynthesisUtterance(dishResult.dish);
  utterThis.voice = voices.find(v => v.lang === "nl-NL" )
  synth.speak(utterThis);

  window.navigator.vibrate([100, 100, 100]);
}

