'use strict';

var $body = $('body');                          // THE BODY
var $main_app = $('.main-app');                  // THE MAIN APP CONTAINER
var $main_menu = $('.main-menu');               // THE MAIN NAV MENU
var $map = $('#map');                           // THE MAIN MAP
var $main = $('.main');                         // MAIN WRAPPER OF CONTENT
var $mainContent = $('.main-content');          // MAIN CONTAINER OF CONTENT
var windowWidth = $(document).width();          // WINDOW WIDTH
var windowHeight = $(document).height();        // WINDOW WIDTH
var $toggle = $('.main-toggle');                // TOGGLE BTN FOR MAIN CONTENT
var $scroller = $('.main-scroller');            // SCROLLER PROMPT FOR UI
var main_height;                                // HEIGHT OF MAIN CONTAINER
var MAIN_CLOSED_HEIGHT;                         // CONSTANT FOR HEIGHT OF CLOSED MAIN
var set_main_offset;                            // COMPUTED VALUE FOR MAIN POSITION
var hasOpenedMain = false;                      // HAS USER OPENED MAIN MENU?

function initPage() {
    setStyles();

    $toggle.click(function() {
        if( $(this).hasClass('closed') ) {
            open_main($(this));
        } else if ( $(this).hasClass('open') ) {
            close_main($(this));
        }
    });

    if ( $body.hasClass('intro') ) {
        // listenForAudioCntl();
    } else if ( $body.hasClass('one') ) {
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

function setStyles() {
    windowWidth = $(document).width();
    windowHeight = $(document).height();

    $body.height( windowHeight );
    $main_app.height( windowHeight );
    $map.height( windowHeight );
    $mainContent.height( windowHeight * .5 );

    if ( !$main.hasClass('open') ) {
        $main.css('bottom', '-' + set_main_offset() + 'px' );
    } else {
        $main.css('bottom', '-' + set_main_offset() + 'px' );
    }

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

function listenForAudioCntl() {
    var sound = $('#opening-sounds');
    sound[0].play();
    var playing = true;

    $('.sound-container').click(function() {
        if (playing) {
            sound[0].pause();
            playing = false;
            $('.sound-container i').removeClass('fa-volume-up').addClass('fa-volume-off');
        } else {
            sound[0].play();
            playing = true;
            $('.sound-container i').addClass('fa-volume-up').removeClass('fa-volume-off');
        }
    });
}

$(document).ready(function() {
    initPage();
});

$( window ).resize(function() {
    setStyles();
});

$(function() {
    $('.owner-toggle').click(function() {
        filterMap( $(this) );
    });

});
