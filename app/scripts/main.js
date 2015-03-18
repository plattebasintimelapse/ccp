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
var opening_sound = $('#opening-sounds');       // OPENING AUDIO
var opening_is_playing = true;

function initPage() {
    setStyles();

    if(window.location.hash) {
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        alert (hash);
        openModal( $('.vig-modal'), hash);
    } else {
      // No hash found
    }

    $toggle.click(function() {
        if( $(this).hasClass('closed') ) {
            open_main($(this));
        } else if ( $(this).hasClass('open') ) {
            close_main($(this));
        }
    });

    if ( $body.hasClass('intro') ) {
        listenForAudioCntl();
    } else if ( $body.hasClass('one') ) {
        makeMap(1);
        // $('#helper-modal').modal('show');
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

    // BABY BEAR BREAKPOINT
    if ( windowWidth > 767 ) {
        $main_menu.css( 'margin-left', - ( $main_menu.width() / 2 ) );
    } else {
        $main_menu.css( 'margin-left', 0 );
    }

    if ( windowHeight < 500 ) {
        $mainContent.height( windowHeight * .28 );
    } else if ( windowHeight < 700) {
        $mainContent.height( windowHeight * .4 );
    } else {
        $mainContent.height( windowHeight * .5 );
    }

    $main.css('bottom', '-' + set_main_offset() + 'px' );

    if ( $main.hasClass('open') ) {
        close_main($toggle);
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
    var opening_sound = $('#opening-sounds');
    opening_is_playing = true;
    setTimeout(function() {
        opening_sound[0].play();
        opening_sound[0].volume = 0;
        opening_sound.animate({volume: 1}, 3000);
    },500);

    $('.sound-container').click(function() {
        if (opening_is_playing) {
            opening_sound[0].pause();
            opening_is_playing = false;
            $('.sound-container i').removeClass('fa-volume-up').addClass('fa-volume-off');
        } else {
            opening_sound[0].play();
            opening_is_playing = true;
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

     $('.panel .panel-close').click(function() {
        $(this).parent().parent().fadeOut();
    });

});
