'use strict';

var $main_menu = $('.main-menu');

$(document).ready(function() {
    initPage();
});

function initPage() {
    // Center Main Menu
    // centerPosition($main_menu);
}

function centerPosition(o) {
    o.css("margin-left", -(o.width() / 2) );
}


var map;
var ccpGeoJSON;
// var vigs = [];
// var vigs = [
//     {
//         "title": "A Title Goes Here",
//         "lat": "41",
//         "long":"-99",
//         "direction":"up",
//         "html_src":"test1",
//         "meta":"Some meta information",
//         "section":"1",
//         "order":"1"
//     },{
//         "title": "A Title Goes Here Two",
//         "lat": "41.1",
//         "long":"-99.5",
//         "direction":"up",
//         "html_src":"test2",
//         "meta":"Some meta information",
//         "section":"1",
//         "order":"2"
//     }
// ]



var ccpOwners = [
    {
        'name': 'Audubon',
        'ownership': 'Audubon',
        'color': 'rgb(141,211,199)',
        'filter': true
    }, {
        'name': 'CNPPID',
        'ownership': 'CNPPID',
        'color': '#FFDF30',
        'filter': true
    }, {
        'name': 'Ducks Unlimited',
        'ownership': 'Ducks Unlimited',
        'color': 'rgb(190,186,218)',
        'filter': true
    }, {
        'name': 'Nebraska Game & Parks',
        'color': 'rgb(251,128,114)',
        'ownership': 'NGPC',
        'filter': true
    }, {
        'name': 'NPPD',
        'ownership': 'NPPD',
        'color': 'rgb(128,177,211)',
        'filter': true
    }, {
        'name': 'PRRIP',
        'ownership': 'PRRIP',
        'color': 'rgb(253,180,98)',
        'filter': true
    }, {
        'name': 'The Crane Trust',
        'ownership': 'PRWCT',
        'color': 'rgb(179,222,105)',
        'filter': true
    }, {
        'name': 'The Nature Conservancy',
        'ownership': 'TNC',
        'color': 'rgb(252,205,229)',
        'filter': true
    }, {
        'name': 'USFWS',
        'ownership': 'USFWS',
        'color': 'rgb(217,217,217)',
        'filter': true
    }
];

var ccpLength = ccpOwners.length;


function makeMap() {

	map = L.map('map', {
		center: [40.8,-99.1],
		zoom: 10
	})

	var tonerUrl = "http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png";

	var url = tonerUrl.replace(/({[A-Z]})/g, function(s) {
	    return s.toLowerCase();
	});


	var basemap = L.tileLayer(url, {
	    subdomains: ['','a.','b.','c.','d.'],
	    minZoom: 6,
	    maxZoom: 14,
	    type: 'png',
	    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
	});

	basemap.addTo(map);

    getVigs();
    mapData();
}

function getVigs() {
    var vigs = [];
    $.getJSON( "../../content/vigs.json", function( data ) {
        console.log(data);
        vigs = data;
    }).done(function() {
        mapVigs(vigs);
    });
}

function mapVigs(vigs) {
    for (var i=0; i < vigs.length; i++) {

        var mlat = parseFloat(vigs[i].lat);
        var mlong = parseFloat(vigs[i].long);

        var vig = new Vignette( [mlat ,mlong], {
            title: vigs[i].title,
            order: vigs[i].order,
            direction: vigs[i].direction,
            html_src: vigs[i].html_src,

        } ).addTo(map).on('click', function() {
            vig.click();
        });

        vig.info();
    }
}

function mapData() {

    function bindLabel (feature, layer) {
       // layer.bindPopup('Name: <b>' + feature.properties.NAME + '</b><br/>Owner: <b>' + feature.properties.OWNERSHIP + '</b><br/>Purchased: <b>' + feature.properties.PRRIPTract);
       // layer.bindLabel('Name: <b>' + feature.properties.NAME + '</b><br/>Owner: <b>' + feature.properties.OWNERSHIP + '</b><br/>Purchased: <b>' + feature.properties.PRRIPTract, { noHide: true, className: 'layer-label' });
    }

    $.getJSON('../data/big-bend-conservation.json', function(data) {
        ccpGeoJSON = L.geoJson(data, {
            style: function(feature){

                var styles = {
                    fillOpacity: .9,
                    weight: 1,
                    color: 'white'
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
            onEachFeature: bindLabel

        }).addTo(map);

    });

}

$( document ).ready(function() {
	$('#map').height( $(window).height() );
    makeMap();
});

$( window ).resize(function() {
    $('#map').height( $(window).height() );
});

$(function() {
    $('.owner-toggle').click(function() {
        filterMap( $(this) );
    });

});