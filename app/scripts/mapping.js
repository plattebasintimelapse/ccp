var map;
var vignettes = [];

function makeMap(n) {

    var southWest = L.latLng(40.05, -100.85),
        northEast = L.latLng(41.57, -97.06),
        bounds = L.latLngBounds(southWest, northEast);

	map = L.map('map', {
		center: [40.75,-99],
		zoom: 10,
        maxBounds: bounds
        // minZoom: 10,
        // maxZoom: 13
	});

    if (n==1) { // PAGE ONE
        map.setZoom(9);

        var url = 'http://api.tiles.mapbox.com/v3/plattebasintl.956irudi/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGxhdHRlYmFzaW50bCIsImEiOiJFX3ZkQmRRIn0.L73n0OBNy5NZMhhb3aLfUA';

        var basemap = L.tileLayer(url, {
            minZoom: 8,
            maxZoom: 11,
            subdomains: ['','a.','b.','c.','d.']
        });

        basemap.addTo(map);

    } else if (n==2) { // PAGE TWO
        map.setZoom(10);

        var url = 'http://api.tiles.mapbox.com/v3/plattebasintl.9vrc0udi/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGxhdHRlYmFzaW50bCIsImEiOiJFX3ZkQmRRIn0.L73n0OBNy5NZMhhb3aLfUA';

        var basemap = L.tileLayer(url, {
            minZoom: 10,
            maxZoom: 13,
            subdomains: ['','a.','b.','c.','d.']
        });

        basemap.addTo(map);
    } else if (n==3) { // PAGE THREE
        var googleLayer = new L.Google('SATELLITE');
        map.addLayer(googleLayer);

        mapLandData();
        // mapAreaData();

        for (var i=0; i<ccpLength; i++) {
            $('#ccp-land').find('.panel-wrapper').append('<span id="' + ccpOwners[i].name + '" class="owner-toggle" style="background-color:' + ccpOwners[i].color + '"><p> ' + ccpOwners[i].name + '</p></span');
        }
    }

    getVigs(n);
}

function getVigs(n) {
    var vigs = [];
    $.getJSON( "../content/vigs.json", function( data ) {

        for (var i=0; i < data.all.length; i++) {
            if (data.all[i].section == n ) {
                vigs.push(data.all[i])
            }
        }

    }).done(function() {
        mapVigs(vigs);
    });

}

function mapVigs(vigs) {
    for (var i=0; i < vigs.length; i++) {

        var mlat = parseFloat(vigs[i].lat);
        var mlong = parseFloat(vigs[i].long);
        var types = [];
        var types_classes = '';
        var vig_content;

        for (var j=0; j < 5; j++) {
            if (typeof vigs[i].type[j] !== 'undefined') {
                switch ( vigs[i].type[j] ) {
                    case "audio":
                        types.push('volume-up');
                        break;
                    case "video":
                        types.push('play-circle');
                        break;
                    case "map":
                        types.push('map-marker');
                        break;
                    case "text":
                        types.push('book');
                        break;
                    case "photo":
                        types.push('camera-retro');
                        break;
                }
            }
        }

        for (var type in types) { types_classes += '<i class="fa fa-' + types[type] + ' fa"></i>'; }

        if ( vigs[i].size == 'square' ) {
            vig_content = '<div class="row"><div class="col col-xs-12"><img src="../images/thumbnail/' + vigs[i].image + '"/></div></div>';
        } else if ( vigs[i].size == 'full' ) {
            vig_content = '<div class="row"><div class="col col-xs-6"><img src="../images/thumbnail/' + vigs[i].image + '"/></div><div class="col col-xs-6"><h5 class="title">' + vigs[i].title + '</h5><div class="vig-types">' + types_classes + '</div></div></div></div>';
        } else if ( vigs[i].size == 'video' ) {
            vig_content = '<div class="row"><div class="col col-xs-12"><img src="../images/thumbnail/' + vigs[i].image + '"/><h5 class="atop-icon"><i class="fa fa-play fa-3x"></i></h5></div></div>';
        } else if ( vigs[i].size == 'map' ) {
            vig_content = '<div class="row"><div class="col col-xs-12"><img src="../images/thumbnail/' + vigs[i].image + '"/><h5 class="atop-icon"><i class="fa fa-map-marker fa-3x"></i></h5></div></div>';
        } else if ( vigs[i].size == 'audio' ) {
            vig_content = '<div class="row"><div class="col col-xs-12"><img src="../images/thumbnail/' + vigs[i].image + '"/><h5 class="atop-icon"><i class="fa fa-volume-up fa-2x"></i></h5></div></div>';
        }

        if ( vigs[i].new ) {
            vig_content = '<div class="new-wrapper"><div class="new-ribbon-wrapper"><div class="new-ribbon">NEW</div></div>' + vig_content;
        }

        var vig = new Vignette({
            page: vigs[i].page,
            new: vigs[i].new,
            className: vigs[i].page + ' vig-popup ' + vigs[i].size
        }).setContent(vig_content).setLatLng([mlat ,mlong]);

        map.addLayer(vig);
        vignettes.push(vig);
    }
}

$('#map').on('click', '.vig-popup', function() {
    var modal = $('.vig-modal');

    // get classes of vig
    var c = $(this).attr('class').split(' ');

    // strip away unnecessary classes
    for (var i=0; i<c.length; i++) {
        if ( c[i] != 'leaflet-popup' && c[i] != 'vig-popup' && c[i] != 'leaflet-zoom-animated' && c[i] != 'square' && c[i] != 'full' && c[i] != 'video' && c[i] != 'map' && c[i] != 'audio') {
            f = c[i];
        }
    }

    openModal(modal, f);
});

function openModal(modal, f) {
    // isolate unique class and build ajax load url
    var url = '../vigs/' + f + '.html';
    location.hash = f;

    // ajax load content into modal
    $.get(url, function(data) {
        modal.html(data);
        modal.modal('show');
    });

    // send google analytics event
    ga('send', 'pageview', {
     'page': location.pathname + location.search  + location.hash,
     'title': f
    });
}