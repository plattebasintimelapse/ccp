
var $main = $('.main'); 						// MAIN CONTAINER OF CONTENT
var $toggle = $('.main-toggle');				// TOGGLE BTN FOR MAIN CONTENT
var main_height = $main.height();				// HEIGHT OF MAIN CONTAINER
var MAIN_CLOSED_HEIGHT = 52						// CONSTANT FOR HEIGHT OF CLOSED MAIN
var offset = main_height - MAIN_CLOSED_HEIGHT;	// COMPUTED VALUE FOR MAIN POSITION

// BEGINNING PAGE STYLINGS
$main.css('bottom', '-' + offset + 'px' );

$(window).resize(function() {
	main_height = $main.height();
	offset = main_height - MAIN_CLOSED_HEIGHT;
	$main.css('bottom', '-' + offset + 'px' );

	close_main( $toggle );
});

$toggle.click(function() {
	if( $(this).hasClass('closed') ) {
		open_main($(this));
	} else if ( $(this).hasClass('open') ) {
		close_main($(this));
	}
});

function open_main(t) {
	t.toggleClass('closed').toggleClass('open');
	t.find('i').removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
	t.find('p').html('close');
	$main.animate({
		bottom: '0'
	}, 300, 'linear' );
}
function close_main(t) {
	t.toggleClass('closed').toggleClass('open');
	t.find('i').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
	t.find('p').html('open');

	$main.animate({
		bottom: '-' + offset + 'px' 
	}, 300, 'linear' );
}
