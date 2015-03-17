var Vignette = L.Popup.extend({

	options: {
		minWidth: 195,
		maxWidth: 210,
		maxHeight: null,
		autoPan: true,
		closeButton: false,
		closeOnClick: false,
		offset: new L.Point(0, 6),
		autoPanPadding: new L.Point(5, 5),
		zoomAnimation: true,
		className: 'vig-popup'
	},

	initialize: function (options, source) {
		L.setOptions(this, options);

		this._page = options.page;
		this._new = options.new;

		this._source = source;
		this._animated = L.Browser.any3d && this.options.zoomAnimation;
	},

	getSource: function() {
		return this._new;
	}
});