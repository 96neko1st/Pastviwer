/*撮影に関するscript*/

//videoのidを取得する変数
var video;
//canvas変数
var canvas;
var context;
//画像
var imgPanelFile = ["./img/panel_1.png","./img/panel_2.png"];
var imgPanel;

var position_x = [150,170];
var position_y = [220,300];
var radius = [60,80];

$(document).ready(function(){
    initVideo();
    $("#mapButton").click(function(){
        window.location.href = "map.html"
    });    
});
//ビデオの初期化
function initVideo(){
    // var number = sessionStorage.getItem("placeNumber");
    // if (number == null) {
    //     number = 0
    // }
    //背景画像の読み込み
    imgPanel = new Image();
    imgPanel.src = imgPanelFile[1];

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

//canvasの初期化
function initCanvas(){
    canvas = document.getElementById("dst");
    /*canvasのサイズをスマホサイズに調整*/
    canvas.width = $(document).width();
    canvas.height = $(document).height();
    context = canvas.getContext("2d");
    /*反転処理*/
    context.translate(canvas.width,0);
    context.scale(-1,1);
    
    setInterval(drawCanvas, 30);
}

//canvansに顔ハメパネルを描画する
function drawCanvas(){
    /* 背景を画像を */
    context.beginPath();
    context.drawImage(imgPanel, 0, 0, canvas.width, canvas.height);
    
    /*顔を当てはめる場所を設定*/
    context.beginPath();
    context.arc(position_x[1], position_y[1], radius[1], 0, Math.PI * 2, false);
    context.clip();
    /*写真を撮影*/
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

