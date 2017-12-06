/*撮影に関するscript*/

//videoのidを取得する変数
var video;
//canvas変数
var canvas;
var context;
//canvasのサイズ
var width,height;
//画像
var image;


$(document).ready(function(){
    initVideo();
});

//ビデオの初期化
function initVideo(){
    //背景画像の読み込み
    image = new Image();
    image.src = "./img/panel_1.png";
    //videoの初期化
    video = document.getElementById("video");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia({
        audio: false, /*音声使用の有無*/
        video: true   /*カメラ使用の有無*/
    }, function(stream) {
        video.src = URL.createObjectURL(stream);
        initCanvas();
    }, function(error) {
        console.error(error);
    });
}

function initCanvas(){
    width = $(document).width();
    height = $(document).height();
    canvas = document.getElementById("dst");
    /*canvasのサイズをスマホサイズに調整*/
    canvas.width = width
    canvas.height = height;
    context = canvas.getContext("2d");
    /*反転処理*/
    context.translate(canvas.width,0);
    context.scale(-1,1);
    
    setInterval(drawCanvas, 30);
}

function drawCanvas(){
    /* 背景を画像を */
    context.beginPath();
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    /*顔を当てはめる場所を設定*/
    context.beginPath();
    context.arc(150, 220, 70, 0, Math.PI * 2, false);
    context.clip();
    /*写真を撮影*/
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

