/* マップに関するスクリプト
   位置情報を取得し、地図を表示する
   竹原の名所に目印(画像を配置する)
*/
var syncerWatch = {
    map: null,
    myMarker: null,
};

/*place場所に関する変数
    場所 0:パルディ 1:学校*/
var placeName = ["パルディ・大崎上島店","広島商船高等専門学校"]
var placeLat = [34.252477, 34.253453];
var placeLng = [132.906987, 132.904284];
var placeImage = ["./img/icon/school.png", "./img/icon/tokyoskytree.png"];

$(document).ready(function() {
    setInterval(getGeolocation, 500);
});

//初期化してgoogle mapを表示する
function initMap(position) {
    //取得できないならリターン
    if (position.coords.latitude == null || position.coords.longitude == null) {
        return false;
    }
    //自身の位置情報
    var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //地図を表示
    syncerWatch.map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 15
    });
    //自身の位置にMartkerを描画する
    syncerWatch.myMarker = new google.maps.Marker({
        position: myLatLng,
        map: syncerWatch.map,
        animation: google.maps.Animation.BOUNCE
    });
    //顔ハメパネルアイコンに関する処理
    for (var i = 0; i < placeImage.length; i++) {
        //撮影場所の中心座標
        var center = new google.maps.LatLng(parseFloat(placeLat[i]), parseFloat(placeLng[i]));
        //撮影場所にアイコンを置く
        var placeMarker = new google.maps.Marker({
            position: center,
            map: syncerWatch.map,
            icon: placeImage[i]
        });
        //撮影場所を中心として撮影可能範囲を示す円を描画
        var circle = new google.maps.Circle({
            map: syncerWatch.map,
            strokeColor: "red", //線の色
            fillColor: "purple", //円の塗りつぶし色
            center: center,
            radius: 100
        })
    }
}

//自身の位置情報を更新する
function updateMap(position){
    //自身の位置情報
    var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // マーカーの場所を変更
    syncerWatch.myMarker.setPosition(myLatLng);
}

//位置情報を取得する
function getGeolocation() {
    //対応しているデバイスか判断
    if (navigator.geolocation) {
        //緯度経度を取得する
        navigator.geolocation.getCurrentPosition(function(position) {
            if(syncerWatch.map == null){
                //mapを初期化
                initMap(position);
            }else{
                updateMap(position);
            }
        }, function(error) {
            // エラー番号に対応したメッセージ
            var errorInfo = ["原因不明のエラーが発生しました…。", "位置情報の取得が許可されませんでした…。", "電波状況などで位置情報が取得できませんでした…。", "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"];
            // エラー番号
            var errorNo = error.code;
            // エラーメッセージ
            var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[errorNo];
            // アラート表示
            alert(errorMessage);
        }, {
            "enableHighAccuracy": false,
            "timeout": 1000000,
            "maximumAge": 0,
        });
    } else {
        // エラーメッセージ
        var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。";
        // アラート表示
        alert(errorMessage);
    }
}

//住所から緯度と経度を取得する
function getLatLngFromAddress(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status){
        if(status == google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            console.log("緯度:"+lat+"経度:"+lng);
        }
    });
}