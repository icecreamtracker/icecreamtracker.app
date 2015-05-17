$(function(){
	window_height = $(window).height();
	$(window).resize(function(){
		nheight =  ( $("body").height() - window_height);
		$("body").height( nheight );
		//console.log(window_height, nheight,$("body").height() );
	});
});

