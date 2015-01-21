var Vignette = L.Marker.extend({
	initialize: function( latlng, options) {
		L.Marker.prototype.initialize.call(this, latlng);

		this.title = options.title;
		this.single = options.single;
		this.order = options.order;
		this.direction = options.direction;
	},

	info: function() {
		console.log(this);
	},

	click: function() {
		var modal = $('.vig-modal');

		var url = '../../vigs/' + this.single + '.html';

		$.get(url, function(data) {
            modal.html(data);
            modal.modal('show');
        }).success(function() {
            // location.href = location.href + "#/" + html_src;
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