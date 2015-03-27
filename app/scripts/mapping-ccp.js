var ccpLandGeoJSON;
var ccpAreaGeoJSON;
var ccpOwners = [
    {
        'name': 'Audubon Society',
        'ownership': 'Audubon',
        'color': 'rgb(84,48,5)',
        'filter': true
    }, {
        'name': 'Central Nebraska Public Power & Irrigation District',
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
        'name': 'Platte River Recovery Implementation Program',
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

var filter = function(feature) {
    for (var i=0; i<ccpLength; i++){
        if (ccpOwners[i].ownership == feature.properties.OWNERSHIP) {
            return ccpOwners[i].filter;
        }
    }
};

function bindLabel(feature, layer) {

    for (var i=0; i<ccpLength; i++){
        if (ccpOwners[i].ownership == feature.properties.OWNERSHIP) {
            var owner_nice_name = ccpOwners[i].name;
        }
    }

    var build_popup_content = '<p>Name: <b>' + feature.properties.NAME + '</b></p>' +
                              '<p>' + feature.properties.STATUS + ': <b>' + owner_nice_name + '</b></p>';

    if ( feature.properties.PRRIPTract ) {
        // build_popup_content += '<p>Purchased: <b>' + feature.properties.PRRIPTract + '</b></p>';
    }

    if ( feature.properties.Acres ) {
        var num = feature.properties.Acres;
        var n = num.toFixed(1);
        build_popup_content += '<p>Area: <b>' + n + ' acres</p>';
    }

    var popup_content = '<div class="ccp-popup dark-font">' + build_popup_content + '</div>';

    layer.bindPopup( popup_content );
}

function bindLayerEvents(layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function buildSelectOptions(feature) {
    $('#ccp-land-select').append('<option value="' + feature.properties.NAME + '">' + feature.properties.NAME + '</option>');
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#6aaac3',
        fillColor: '#6aaac3',
        dashArray: '',
        fillOpacity: 0.2
    });

    if (!L.Browser.ie && !L.Browser.opera) { layer.bringToFront(); }
}

function resetHighlight(e) { ccpLandGeoJSON.resetStyle(e.target);}

function zoomToFeature(e) { map.fitBounds(e.target.getBounds()); }

function mapLandData() {

    $.getJSON('../data/ccp.json', function(data) {
        ccpLandGeoJSON = L.geoJson(data, {
            style: function(feature){

                var styles = {
                    fillOpacity: .8,
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
            onEachFeature: function(feature, layer) {
                bindLabel(feature, layer);
                bindLayerEvents(layer);
                // buildSelectOptions(feature);
            },
            filter: filter

        }).addTo(map);

    });
}

function mapAreaData() {
    $.getJSON('../data/ccpArea.json', function(data) {
        ccpAreaGeoJSON = L.geoJson(data, {
            style: function(feature) {

                var styles = {
                    fillOpacity: .1,
                    color: "#8A3324",
                    weight: 2,
                    opacity: .8
                }

                return styles;
            },
            onEachFeature: function(feature, layer) {
                // layer.bindPopup( '<div class="ccp-popup dark-font"><p>This land is under PRRIPs associated habitat and considered area for habitat concern.</p></div>' );
            }
        }).addTo(map).bringToBack();
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