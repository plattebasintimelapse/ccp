'use strict';

var $body = $('body');
var $main_menu = $('.main-menu');
var $map = $('#map');

function initPage() {
    $map.height( $(window).height() );

    if ( $body.hasClass('one') ) {
        makeMap(1);
        $main_menu.find( 'li:nth-child(1) a').addClass('active');
    } else if ( $body.hasClass('two') ) {
        makeMap(2);
        $main_menu.find( 'li:nth-child(2) a').addClass('active');
    } else if ( $body.hasClass('three') ) {
        makeMap(3);
        $main_menu.find( 'li:nth-child(3) a').addClass('active');
    }

    $(".fancybox").fancybox();
}

function listenVideo(id){
    console.log(id + ' video ready');
    var $iframe = $('#' + id)[0];
    var player = $f($iframe);

    var $inline_btn = $('.inline-video-btn i');
    var $vid_containder = $('#' + id + '-video');

    player.addEvent('ready', function() {
        player.addEvent('play', play);
        player.addEvent('finish', onFinish);
        player.addEvent('pause', pause);

        var playing = false;
        $('#play-' + id).click(function() {
            if (playing) {
                player.api('unload');
                playing = false;
            } else {
                player.api('play');
                playing = true;
            }
        });
    });

    function play(id) {
        $vid_containder.toggleClass('playing-inline-video');
        $inline_btn.addClass('fa-pause').removeClass('fa-play');
    }

    function pause(id) {
        $vid_containder.toggleClass('playing-inline-video');
        $inline_btn.addClass('fa-play').removeClass('fa-pause');
    }

    function onFinish(id) {
        $vid_containder.removeClass('playing-inline-video');
        $inline_btn.addClass('fa-play').removeClass('fa-pause');
    }
}

$(document).ready(function() {
    initPage();
});

$( window ).resize(function() {
    $map.height( $(window).height() );
});

$(function() {
    $('.owner-toggle').click(function() {
        filterMap( $(this) );
    });

});
