
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


$(function(){
	/*GLOBAL VARIABLE*/
	app = "";
	interval = "";
	/*LOGIN*/
	$(".loginBtn").click(function(){
		$.ajax({
			method: "POST",
			url: "https://icecreamtracker.rocks/users/ajaxlogin",
			data: { email: $(".email").val(), password: $(".password").val() },
			crossDomain : true,
			cache : false,
			xhrFields: { withCredentials: false }
		}).done(function(e){
			app = JSON.parse(e);
			if(e!="false"){
				$.post("start_map.html",function(e){
					$(".ajaxChange").html(e)
				}).done(function(){
					initialize();
				});
			}else{
				$(".loginResponse").text("Something is wrong with your login !")
			}
		});
	});
	
	/*START TRACKING*/
	$("body").on("click",".track", function(){
		if($(this).attr("start")=="true"){
			interval = setInterval(function(){updateLocation()}, 8000);
			$(".track").text("Stop Tracking").attr("start",false);
			
		}else{
			clearInterval(interval);
			$(".track").text("Start Tracking").attr("start",true);
		}
	});
	
});

var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  marker = new google.maps.Marker({
      position: new google.maps.LatLng(-34.397, 150.644),
      map: map,
      title: 'You are here',
	   icon: "img/marker/marker.png"
  });  
}

function updateLocation(){
	navigator.geolocation.getCurrentPosition(
	function(position) {
		$.post('https://icecreamtracker.rocks/Locations/ajax_update/'+app.User['id']+'/'+position.coords.latitude+"/"+position.coords.longitude, function (e) {});
		
		marker.setPosition( new google.maps.LatLng( position.coords.latitude, position.coords.longitude ) );
		map.panTo( new google.maps.LatLng(position.coords.latitude, position.coords.longitude ) );		
		
	},
	function() {
		alert('Error getting location');
	});
}