
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

$( document ).bind( "mobileinit", function() { $.mobile.allowCrossDomainPages = true; });
$(function(){
	$.mobile.allowCrossDomainPages = true;
	setInterval(function(){myloc()}, 10000);
});
function myloc(){
	navigator.geolocation.getCurrentPosition(
	function(position) {
		$.get('https://bluejaydev.com/dev/icrecream/?lat='+position.coords.latitude+"&lng="+position.coords.longitude, function (data) {
			$(".data").html(data);
		});
	},
	function() {
		alert('Error getting location');
	});
}