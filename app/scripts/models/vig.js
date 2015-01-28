var Vignette = L.Popup.extend({

	options: {
		minWidth: 150,
		maxWidth: 250,
		maxHeight: null,
		autoPan: true,
		closeButton: false,
		closeOnClick: false,
		offset: new L.Point(0, 6),
		autoPanPadding: new L.Point(5, 5),
		zoomAnimation: true
	},

	initialize: function (options, source) {
		L.setOptions(this, options);

		this.page = options.page;
		this._order = options.order;
		this._direction = options.direction;

		this._source = source;
		this._animated = L.Browser.any3d && this.options.zoomAnimation;
	}
});