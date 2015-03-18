var map;
var ccpLandGeoJSON;
var ccpAreaGeoJSON;
var vignettes = [];


var ccpOwners = [
    {
        'name': 'Audubon Society',
        'ownership': 'Audubon',
        'color': 'rgb(84,48,5)',
        'filter': true
    }, {
        'name': 'Central Nebraska Public Power & Irriation District',
        'ownership': 'CNPPID',
        'color': 'rgb(140,81,10)',
        'filter': true
    }, {
        'name': 'Ducks Unlimited',
        'ownership': 'Ducks Unlimited',
        'color': 'rgb(191,129,45)',
        'filter': true
    }, {
        'name': 'Nebraska Game & Parks',
        'ownership': 'NGPC',
        'color': 'rgb(223,194,125)',
        'filter': true
    }, {
        'name': 'Nebraska Public Power District',
        'ownership': 'NPPD',
        'color': 'rgb(199,234,229)',
        'filter': true
    }, {
        'name': 'Platte River Recovery Implemenation Program',
        'ownership': 'PRRIP',
        'color': 'rgb(128,205,193)',
        'filter': true
    }, {
        'name': 'The Crane Trust',
        'ownership': 'PRWCT',
        'color': 'rgb(53,151,143)',
        'filter': true
    }, {
        'name': 'The Nature Conservancy',
        'ownership': 'TNC',
        'color': 'rgb(1,102,94)',
        'filter': true
    }, {
        'name': 'U.S. Fish & Wildlife Service',
        'ownership': 'USFWS',
        'color': 'rgb(0,60,48)',
        'filter': true
    }
];

var ccpLength = ccpOwners.length;

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

var filter = function(feature) {
    for (var i=0; i<ccpLength; i++){
        if (ccpOwners[i].ownership == feature.properties.OWNERSHIP) {
            return ccpOwners[i].filter;
        }
    }
};

function mapLandData() {

    function bindLabel (feature, layer) {
       layer.bindPopup('<div class="dark-font">Name: <b>' + feature.properties.NAME + '</b><br/>Owner: <b>' + feature.properties.OWNERSHIP + '</b><br/>Purchased: <b>' + feature.properties.PRRIPTract) + '</div>';
    }

    $.getJSON('../data/ccpLand.json', function(data) {
        ccpLandGeoJSON = L.geoJson(data, {
            style: function(feature){

                var styles = {
                    fillOpacity: .9,
                    weight: 1,
                    color: 'black'
                }

                switch (feature.properties.OWNERSHIP) {
                    case "Audubon":  styles.fillColor=ccpOwners[0].color; break;
                    case "CNPPID":  styles.fillColor=ccpOwners[1].color; break;
                    case "Ducks Unlimited":  styles.fillColor=ccpOwners[2].color; break;
                    case "NGPC":  styles.fillColor=ccpOwners[3].color; break;
                    case "NPPD":  styles.fillColor=ccpOwners[4].color; break;
                    case "PRRIP":  styles.fillColor=ccpOwners[5].color; break;
                    case "PRWCT":  styles.fillColor=ccpOwners[6].color; break;
                    case "TNC":  styles.fillColor=ccpOwners[7].color; break;
                    case "USFWS":  styles.fillColor=ccpOwners[8].color; break;
                }

                return styles;
            },
            onEachFeature: bindLabel,
            filter: filter

        }).addTo(map);

    });

    $.getJSON('../data/ccpArea.json', function(data) {
        ccpAreaGeoJSON = L.geoJson(data, {
            style: function(feature) {

                var styles = {
                    fillOpacity: 0,
                    color: "#8A3324",
                    weight: 2,
                    opacity: .8
                }

                return styles;
            }
        }).addTo(map);
    });
}

function filterMap( $clicked ) {
    $clicked.toggleClass('off');

    for (var i=0; i<ccpLength; i++){
        if (ccpOwners[i].name == $clicked.attr('id')) {
            if (ccpOwners[i].filter) {
                ccpOwners[i].filter = false;
            } else {
                ccpOwners[i].filter = true;
            }
        }
    }

    map.removeLayer(ccpLandGeoJSON);
    mapLandData();

}