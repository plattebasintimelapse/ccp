
var $ccp_land = $('#ccp-land');
var $ccp_toggle = $('.toggle-btn');


	
$ccp_land.hover(function() {
	if ( !$ccp_land.hasClass('open') ) {
		$ccp_land.animate({
			right: '-230px'
		}, 300, 'linear' );
	}
},function() {
	if ( !$ccp_land.hasClass('open') ) {
		setTimeout(function() {
			$ccp_land.animate({
				right: '-240px'
			}, 300, 'linear' );
		}, 300);
	}
});

var ccpToggle = function() {
	$ccp_toggle.click(function() {

		if ( $ccp_land.hasClass('open') ) {
			$ccp_land.animate({
				right: '-240px'
			}, 300, 'linear' );
			$ccp_land.find('.toggle-btn i').addClass('fa-caret-up').removeClass('fa-caret-down');
		} else {
			$ccp_land.animate({
				right: '20px'
			}, 300, 'linear' );
			$ccp_land.find('.toggle-btn i').removeClass('fa-caret-up').addClass('fa-caret-down');
		}

		$ccp_land.toggleClass('open');
	});
}

ccpToggle();

