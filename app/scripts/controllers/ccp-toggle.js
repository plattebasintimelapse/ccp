
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

	$ccp_toggle.click(function() {

		if ( $ccp_land.hasClass('open') ) {
			$ccp_land.animate({
				right: '-240px'
			}, 300, 'linear' );
		} else {
			$ccp_land.animate({
				right: '20px'
			}, 300, 'linear' );
		}

		$ccp_land.toggleClass('open');
	});

