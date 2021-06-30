prediction1 = "";
prediction2 = "";

Webcam.set({
  width:360,
  height:250,
  image_format:'png',
  png_quality:90
});

Webcam.attach('#camera');

function capture_image() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML = '<img id = "capture_image" src = "' + data_uri + '"/>'
  });
}

console.log("ml5.version",ml5.version);
classfier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8Kg8gKyh9/model.json',modelLoaded);

function modelLoaded() {
  console.log("model loaded");
}


function speak() {
   var synth = window.speechSynthesis;
   speak_data1 = "The first prediction is" + prediction1;
   speak_data2 = "The second prediction is" + prediction2;
   var utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
   synth.speak(utterthis);
}


function predict_emoji() {
  img = document.getElementById("capture_image");
  classfier.classify(img,gotResult);
}

function gotResult(error,results) {
  if(error) {
    console.log(error);
  }
else {
  console.log(results);
  document.getElementById("Emotion_Name").innerHTML = results[0].label;
document.getElementById("Emotion_Name2").innerHTML = results[1].label;

prediction1 = results[0].label;
prediction2 = results[1].label;

speak();

if (results[0].label == "Angry") {
  document.getElementById("Emoji").innerHTML = "&#128545";
}
if (results[0].label == "Sad") {
  document.getElementById("Emoji").innerHTML = "&#128532";
}
    if (results[0].label == "Happy") {
      document.getElementById("Emoji").innerHTML = "&#128522";
    }
}
  if (results[1].label == "Angry") {
    document.getElementById("Emoji2").innerHTML = "&#128545";
  }
  if (results[1].label == "Sad") {
    document.getElementById("Emoji2").innerHTML = "&#128532";
  }
  if (results[1].label == "Happy") {
    document.getElementById("Emoji2").innerHTML = "&#128522";
  }
}