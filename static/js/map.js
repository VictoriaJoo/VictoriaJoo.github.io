var mapOptions = {
    center: new naver.maps.LatLng(37.5152535228382, 127.103068896795),
    zoom: 18
};

var map = new naver.maps.Map('map', mapOptions);

var markerOptions = {
    position: new naver.maps.LatLng(37.5152535228382, 127.103068896795), //마커찍을 좌표
    map: map,
    icon: {
        url: 'resources/img/marker.png', //아이콘 경로
        size: new naver.maps.Size(22, 36), //아이콘 크기
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(11, 35)
    }
};

// 마커 생성
var marker = new naver.maps.Marker(markerOptions);