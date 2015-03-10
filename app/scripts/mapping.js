var map;
var ccpGeoJSON;
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
		center: [40.8,-99],
		zoom: 10,
        maxBounds: bounds,
        minZoom: 10,
        maxZoom: 13
	});

    // SAVE MAPBOX USAGE COMMENT OUT WHEN NOT NEEDED

    if (n==1) { // PAGE ONE
        // var tonerUrl = "http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png";

        // url = tonerUrl.replace(/({[A-Z]})/g, function(s) {
        //     return s.toLowerCase();
        // });

        var url = 'http://api.tiles.mapbox.com/v3/plattebasintl.956irudi/{z}/{x}/{y}.png';
        addBaseMap(url);
    } else if (n==2) { // PAGE TWO
        var url = 'http://api.tiles.mapbox.com/v3/plattebasintl.9vrc0udi/{z}/{x}/{y}.png';
        addBaseMap(url);
    } else if (n==3) { // PAGE THREE
        var googleLayer = new L.Google('SATELLITE');
        map.addLayer(googleLayer);
        mapLandData();

        for (var i=0; i<ccpLength; i++) {
            $('#ccp-land').find('.panel-wrapper').append('<span id="' + ccpOwners[i].name + '" class="owner-toggle" style="background-color:' + ccpOwners[i].color + '"><p> ' + ccpOwners[i].name + '</p></span');
        }
    }

    function addBaseMap(url) {
        var basemap = L.tileLayer(url, {
            subdomains: ['','a.','b.','c.','d.']
        });

        basemap.addTo(map);
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

        var vig_content;

        vig_content = '<div class="row"><div class="col-xs-6"><img src="../images/thumbnail/' + vigs[i].image + '"/></div><div class="col-xs-6"><h5 class="title">' + vigs[i].title + '</h5><i class="fa fa-volume-up fa-lg"></i><i class="fa fa-beer fa-lg"></i></div></div></div>';

        var vig = new Vignette({
            page: vigs[i].page,
            order: vigs[i].order,
            direction: vigs[i].direction,
            className: vigs[i].page + ' vig-popup',
            idName: vigs[i].page
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
        if ( c[i] != 'leaflet-popup' && c[i] != 'vig-popup' && c[i] != 'leaflet-zoom-animated') {
            f = c[i];
        }
    }

    // isolate unique class and build ajax load url
    var url = '../vigs/' + f + '.html';

    // ajax load content into modal
    $.get(url, function(data) {
        modal.html(data);
        modal.modal('show');
    }).done(function() {
        // $('.loading').fadeOut();
        // $('.vig-content').fadeIn();
    });
});

var filter = function(feature) {
    for (var i=0; i<ccpLength; i++){
        if (ccpOwners[i].ownership == feature.properties.OWNERSHIP) {
            return ccpOwners[i].filter;
        }
    }
};

function mapLandData() {

    function bindLabel (feature, layer) {
       layer.bindPopup('Name: <b>' + feature.properties.NAME + '</b><br/>Owner: <b>' + feature.properties.OWNERSHIP + '</b><br/>Purchased: <b>' + feature.properties.PRRIPTract);
       // layer.bindLabel('Name: <b>' + feature.properties.NAME + '</b><br/>Owner: <b>' + feature.properties.OWNERSHIP + '</b><br/>Purchased: <b>' + feature.properties.PRRIPTract, { noHide: true, className: 'layer-label' });
    }

    $.getJSON('../data/big-bend-conservation.json', function(data) {
        ccpGeoJSON = L.geoJson(data, {
            style: function(feature){

                var styles = {
                    fillOpacity: .9,
                    weight: 1,
                    color: 'gray'
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

    map.removeLayer(ccpGeoJSON);
    mapLandData();

}