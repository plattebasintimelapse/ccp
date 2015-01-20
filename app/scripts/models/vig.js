var Vignette = L.Marker.extend({
	initialize: function( latlng, options) {
		L.Marker.prototype.initialize.call(this, latlng);

		this.title = options.title;
		this.order = options.order;
		this.direction = options.direction;
		this.html_src = options.html_src;
	},

	info: function() {
		// console.log('Title: ' + this.title);
		// console.log('Order: ' + this.order);
		// console.log('Direction: ' + this.direction);
		// console.log('HTML: ' + this.html_src);

		console.log(this);
	},

	click: function() {
		console.log(this);

		var modal = $('.vig-modal');

		var url = '../../vigs/' + this.html_src + '.html';

		console.log(this.html_src);

		$.get(url, function(data) {
            modal.html(data);
            modal.modal('show');
        }).success(function() {
            /* boom. loaded. */
        });

		// $('.vig-modal').modal('show')
	},

	next: function(){
		console.log('next');
	},

	prev: function(){
		console.log('prev');
	}
});