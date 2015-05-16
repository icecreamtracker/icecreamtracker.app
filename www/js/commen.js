$(function(){
	window_height = $(window).height();
	$(window).resize(function(){
		nheight =  ( $("body").height() - window_height);
		$("body").height( nheight );
		//console.log(window_height, nheight,$("body").height() );
	});
	
	
	$.ajax({
		method: "POST",
		url: "https://icecreamtracker.rocks",
		data: { name: "John", location: "Boston" },
		crossDomain : true,
		xhrFields: { withCredentials: false }

	});

});

