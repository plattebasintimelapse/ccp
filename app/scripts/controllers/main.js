var scrollerFadeIn;

function open_main(t) {
	hasOpenedMain = true;
	t.toggleClass('closed').toggleClass('open').removeClass('not-yet-opened');
	$main.toggleClass('open');
	t.find('i').removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
	t.find('p').html('close');
	$main.animate({
		bottom: '0'
	}, 300, 'linear' );

	scrollerFadeIn = setTimeout(function() {
		$scroller.fadeIn();
	}, 5000);
}
function close_main(t) {
	t.toggleClass('closed').toggleClass('open');
	$main.toggleClass('open');
	t.find('i').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
	t.find('p').html('open');

	$main.animate({
		bottom: '-' + set_main_offset() + 'px'
	}, 300, 'linear' );

	clearTimeout(scrollerFadeIn);
	$scroller.fadeOut();
}

var set_main_offset = function() {
	main_height = $main.height();
	if(windowWidth > 1280) { MAIN_CLOSED_HEIGHT = 78 }
	else if (windowWidth > 961) { MAIN_CLOSED_HEIGHT = 70 }
	else if (windowWidth > 769) { MAIN_CLOSED_HEIGHT = 56 }
	else { MAIN_CLOSED_HEIGHT = 52 }

	return main_height - MAIN_CLOSED_HEIGHT;
}