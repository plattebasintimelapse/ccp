var map;
var ccpGeoJSON;
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
        maxBounds: bounds,
        minZoom: 10,
        maxZoom: 13
	});

    if (n==1) { // PAGE ONE

        var url = 'http://api.tiles.mapbox.com/v3/plattebasintl.956irudi/{z}/{x}/{y}.png';
        addBaseMap(url);
    } else if (n==2) { // PAGE TWO
        var url = 'http://api.tiles.mapbox.com/v3/plattebasintl.9vrc0udi/{z}/{x}/{y}.png';
        addBaseMap(url);
    } else if (n==3) { // PAGE THREE
        // var googleLayer = new L.Google('SATELLITE');
        // map.addLayer(googleLayer);

        // var geojsonFeature = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"Area_SqMi":700.862944921,"Area_Acres":448554.06854},"geometry":{"type":"Polygon","coordinates":[[[2166791.4210629016,413187.73718464375],[2161361.7542071044,405066.78974470496],[2148096.372164488,394420.17916190624],[2132601.9229373634,375771.44102469087],[2128661.8974971175,367810.1499839872],[2118557.3987178653,355724.39972016215],[2104274.4415944964,343721.84157027304],[2085377.2985387295,334152.3535976559],[2070729.780534327,331003.3524635583],[2055799.2486176044,322184.6951124519],[2046729.8456490487,319393.77592018247],[2036258.2321130186,318688.8006878793],[2021946.2288403362,310767.78900523484],[2013071.3411780894,309278.36637733877],[1998278.728034541,304150.1941894442],[1980895.573207274,300213.260598734],[1968852.1081659794,292586.9574097842],[1935351.0880924314,284684.8408000171],[1918690.2709503174,284406.23312313855],[1911575.6655876786,282600.3052491993],[1883711.0673880875,283397.77452385426],[1875170.5713041872,285592.7474321276],[1853442.8581092805,283537.0241641402],[1822035.0072715282,292326.5045687705],[1802361.4285398573,290500.80120661855],[1796787.046629265,291937.2001669705],[1765992.477822557,290683.978195101],[1757504.2734464258,288766.2958177179],[1743667.0815030634,291815.2601222694],[1737002.7508593798,291595.4376243353],[1725004.1337586492,294715.9582775533],[1713371.5517088026,305092.2209663391],[1703906.9842135906,310590.6610278785],[1718102.524610117,345972.77863274515],[1728362.6995729655,339139.20454514027],[1742649.3229087591,332464.63572125137],[1756810.2828340977,331227.9195791632],[1770887.7091187537,328024.22005958855],[1800900.3368107826,329158.4210833162],[1809438.5041736811,327884.99894839525],[1824237.754740566,329721.6966032535],[1854153.6946128458,321332.02293525636],[1877478.248453945,323095.58401091397],[1889728.966389373,319982.00543400645],[1903725.3980291933,321884.32599674165],[1915837.710905701,326989.2688626349],[1934470.2636208236,331592.39274698496],[1957548.1864383817,333374.09548065066],[1969461.3420987427,335492.9548019618],[1982744.3128739595,341429.54266873],[2008910.8843827099,346064.82503660023],[2013852.8789516091,350235.18666905165],[2039424.9311123788,365702.02391037345],[2077973.2038918436,382066.237477988],[2084267.726181373,387691.184670195],[2095251.5640157461,392620.92276875675],[2104276.3020298034,399533.17861276865],[2122340.0161214024,421343.648513183],[2134458.983640492,431361.8814394027],[2138611.922990218,437101.0164255947],[2166791.4210629016,413187.73718464375]]]}}]};

        // var ccp_styles = {
        //     color: "red",
        //     opacity: 1
        // }

        // L.geoJson(geojsonFeature, {
        //     style: ccp_styles
        // }).addTo(map);

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

        for (var type in types) { types_classes += '<i class="fa fa-' + types[type] + ' fa-lg"></i>'; }

        vig_content = '<div class="row"><div class="col-xs-6"><img src="../images/thumbnail/' + vigs[i].image + '"/></div><div class="col-xs-6"><h5 class="title">' + vigs[i].title + '</h5><div class="vig-types">' + types_classes + '</div></div></div></div>';

        var vig = new Vignette({
            page: vigs[i].page,
            new: vigs[i].new,
            className: vigs[i].page + ' vig-popup'
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

    $.getJSON('../data/ccp.json', function(data) {
        var styles = {
            fill: "red"
        }

        ccpAreaGeoJSON = L.geoJson(data, {
            style: styles
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