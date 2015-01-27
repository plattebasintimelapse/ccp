
var $main = $('.main'); 						// MAIN CONTAINER OF CONTENT
var $toggle = $('.main-toggle');				// TOGGLE BTN FOR MAIN CONTENT
var $scroller = $('.main-scroller');			// SCROLLER PROMPT FOR UI
var main_height = $main.height();				// HEIGHT OF MAIN CONTAINER
var MAIN_CLOSED_HEIGHT = 68;					// CONSTANT FOR HEIGHT OF CLOSED MAIN
var offset = main_height - MAIN_CLOSED_HEIGHT;	// COMPUTED VALUE FOR MAIN POSITION
var hasOpenedMain = false;						// HAS USER OPENED MAIN MENU?


$(document).ready(function() {
	// BEGINNING PAGE STYLINGS
	$main.css('bottom', '-' + offset + 'px' );

	$toggle.click(function() {
		if( $(this).hasClass('closed') ) {
			open_main($(this));
		} else if ( $(this).hasClass('open') ) {
			close_main($(this));
		}
	});
});

$(window).resize(function() {
	main_height = $main.height();
	offset = main_height - MAIN_CLOSED_HEIGHT;
	$main.css('bottom', '-' + offset + 'px' );

	close_main( $toggle );
});

function open_main(t) {
	hasOpenedMain = true;
	t.toggleClass('closed').toggleClass('open').removeClass('not-yet-opened');
	$main.toggleClass('open');
	t.find('i').removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
	t.find('p').html('close');
	$main.animate({
		bottom: '0'
	}, 300, 'linear' );

	setTimeout(function() {
		$scroller.fadeIn();
		var f = function() { $scroller.animate({marginRight: "40px"}, 1000, function() { $(this).animate({marginRight: "0px"}, 1000, f ) }) }
		f();
	}, 5000);
}
function close_main(t) {
	t.toggleClass('closed').toggleClass('open');
	$main.toggleClass('open');
	t.find('i').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
	t.find('p').html('open');

	$main.animate({
		bottom: '-' + offset + 'px'
	}, 300, 'linear' );

	$scroller.fadeOut();
}