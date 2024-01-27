Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeimage(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="hello" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JKIZPPrDv/model.json", modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!')
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "prediction one is "+ results[0].label;
    speak_data_2 = "prediction two is "+ results[1].label;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);
}

function observeimg(){
    img = document.getElementById("hello");
    classifier.classify(img, gotresults);
}

function gotresults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        if(results[0].label == "Happy"){
            document.getElementById("emotion1").innerHTML = "Happy";
            document.getElementById("emoji1").innerHTML = "😀";
        }
        if(results[0].label == "Sad"){
            document.getElementById("emotion1").innerHTML = "Sad";
            document.getElementById("emoji1").innerHTML = "😭";
        }
        if(results[0].label == "Angry"){
            document.getElementById("emotion1").innerHTML = "Angry";
            document.getElementById("emoji1").innerHTML = "😡";
        }
    
    if(results[1].label == "Happy"){
        document.getElementById("emotion2").innerHTML = "Happy";
        document.getElementById("emoji2").innerHTML = "😀";
    }
    if(results[1].label == "Sad"){
        document.getElementById("emotion2").innerHTML = "Sad";
        document.getElementById("emoji2").innerHTML = "😭";
    }
    if(results[1].label == "Angry"){
        document.getElementById("emotion2").innerHTML = "Angry";
        document.getElementById("emoji2").innerHTML = "😡";
    }
}
}