var map;
var ccpGeoJSON;

var ccpOwners = [
    {
        'name': 'Audubon',
        'ownership': 'Audubon',
        'color': 'rgb(84,48,5)',
        'filter': true
    }, {
        'name': 'CNPPID',
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
        'color': 'rgb(223,194,125)',
        'ownership': 'NGPC',
        'filter': true
    }, {
        'name': 'NPPD',
        'ownership': 'NPPD',
        'color': 'rgb(199,234,229)',
        'filter': true
    }, {
        'name': 'PRRIP',
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
        'name': 'USFWS',
        'ownership': 'USFWS',
        'color': 'rgb(0,60,48)',
        'filter': true
    }
];

var ccpLength = ccpOwners.length;

function makeMap(n) {

    var southWest = L.latLng(40.0350, -100.8463),
        northEast = L.latLng(41.5672, -97.0642),
        bounds = L.latLngBounds(southWest, northEast);

	map = L.map('map', {
		center: [40.8,-99.1],
		zoom: 10,
        maxBounds: bounds
	});

    if (n==1) { // PAGE ONE
        var tonerUrl = "http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png";

        var url = tonerUrl.replace(/({[A-Z]})/g, function(s) {
            return s.toLowerCase();
        });
    } else if (n==2) { // PAGE TWO
        var url = 'http://api.tiles.mapbox.com/v3/plattebasintl.4vi8jjor/{z}/{x}/{y}.png';
    } else if (n==3) { // PAGE THREE
        var url = 'http://api.tiles.mapbox.com/v3/plattebasintl.4vi8jjor/{z}/{x}/{y}.png';
    }

    // var tonerUrl = "http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png";

    // var url = tonerUrl.replace(/({[A-Z]})/g, function(s) {
    //     return s.toLowerCase();
    // });

	var basemap = L.tileLayer(url, {
	    subdomains: ['','a.','b.','c.','d.'],
	    minZoom: 10,
	    maxZoom: 13
     //    ,
	    // type: 'png',
	    // attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
	});

	basemap.addTo(map);

    if ( n == 3 ) {
        mapLandData();

        for (var i=0; i<ccpLength; i++) {
            $('#land-ownership').append('<span id="' + ccpOwners[i].name + '" class="owner-toggle" style="background-color:' + ccpOwners[i].color + '"><p> ' + ccpOwners[i].name + '</p></span');
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

var vignettes = [];

function mapVigs(vigs) {
    for (var i=0; i < vigs.length; i++) {

        var mlat = parseFloat(vigs[i].lat);
        var mlong = parseFloat(vigs[i].long);

        var vig_content;

        // if (vigs[i].image) {
        //     vig_content = '<div class="row"><div class="col-xs-6"><img src="../images/' + vigs[i].image + '"/></div><div class="col-xs-6"><p>' + vigs[i].text + '</p></div></div>';
        // } else {
        //     vig_content = '<p>' + vigs[i].text + '</p>';
        // }

        vig_content = '<div class="row"><div class="col-xs-12"><img src="../images/vigs/' + vigs[i].image + '"/><h3>' + vigs[i].title + '</h3></div></div>';

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
    // console.log(vignettes);
}

$('#map').on('click', '.vig-popup', function() {
    var modal = $('.vig-modal');

    var c = $(this).attr('class').split(' ');

    for (var i=0; i<c.length; i++) {
        if ( c[i] != 'leaflet-popup' && c[i] != 'vig-popup' && c[i] != 'leaflet-zoom-animated') {
            f = c[i];
        }
    }

    var url = '../vigs/' + f + '.html';

    $.get(url, function(data) {
        modal.html(data);
        modal.modal('show');
    }).success(function() {
        // location.href = location.href + "#/" + html_src;
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