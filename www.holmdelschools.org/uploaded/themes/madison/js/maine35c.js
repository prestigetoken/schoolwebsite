 /**
 *
 * Madision Theme - madison
 * @link http://holmdelk12njus.templates.finalsite.com
 * Site Template : madison
 * Built By: Stephen Petrus
 * Project Manager: David Lopes
 * Designer: Keisha Croxton
 * ==== Git Info ====
 * Branch Name: clients/holmdelk12njus
 * Build version: 3.2.3
 * Git Tag: Composer-Build-2.0-375-gdaad11011b
 * Last build by: Wendy Beaulac
 *
 **/

// Build package info 
window.buildinfo = {
  buildname : 'fs-composer-build',
  ver : '3.2.3',
  template : 'madison'
};

/*!
 * global_enhancements is a file particular to certain pages
 * it contains site enhancement js only
**/


jQuery(function($) {
  //check if browser supports placeholders for placeholder()
  $.support.placeholder = (function(){
	var i = document.createElement('input');
	return 'placeholder' in i;
  })();

  var $body = $('body');
  var $mainSlideshow ='.main-slideshow';


  // ================================
  // Home
  // ================================

  if($('.home').length) {

    // Slideshow must use:
    // Media Element >> 'player' mode >> 'custom player' option under 'advanced settings'

    // Find slideshow data
    var jsonMainSlides = $($mainSlideshow + ' .fsMediaCustomPlayer').attr('data-playlisturl');

    $.getJSON(jsonMainSlides, function(data) {

      // Populate Slideshow
      $.each(data.objects, function(i, object) {
        $('<article style="background-image: url(' + object.full_path + ');"></article>')
          .append('<div class="caption-wrapper"><div class="caption">' + object.object_description + '</div></div>')
          .appendTo($mainSlideshow + ' .fsMediaContainer');
      });

    });

    function str2DOM (html) {
      var el = document.createElement('div');
      el.innerHTML = html;
      return el.childNodes[0];
    }

    var checkSliderExist = setInterval(function() {
      var player = $('.main-slideshow .fsMediaCustomPlayer'),
        articles = $('.main-slideshow .fsMediaCustomPlayer article')
        ;

      if (articles.length) {
        player.on('init', function(slick) {
          if (!$body.hasClass("fsComposeMode")) {
            player.find(".slick-track").attr("title","Hero Slideshow");

            var playBtn = str2DOM("<button class='slider-play-btn'>Play</button>");

            player.prepend(playBtn);
            player.addClass('slider-paused');

            playBtn.addEventListener("click", function () {
              player.toggleClass("slider-playing");
              player.toggleClass("slider-paused");

              if (player[0].classList.contains("slider-playing")) {
                player.slick("slickPlay");
              } else {
                player.slick("slickPause");
              }
            });

            player.find('.slick-dots li').each(function(i) {
              var item = $(this);

              setTimeout(function() {
                item.removeAttr('role');
              }, 100);
            });
          }
        });

        $('.main-slideshow .fsMediaCustomPlayer').slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          fade: true,
          autoplay: true,
          autoplaySpeed: 4000,
          slidesToShow: 1
        });

        $('.main-slideshow').find(".slick-slide").each(function () {
            var $slide = $(this);
            if ($slide.attr('aria-describedby') !== undefined) { // ignore extra/cloned slides
                $(this).attr('id', $slide.attr('aria-describedby') + '-slide');
            }
        });
        clearInterval(checkSliderExist);
       }
    }, 100); // check every 100ms

    // Resources Main Slider 1/30/19

    $('.resources-home-slider article').each(function() {
		  var elementImage = $(this).find('img');
		  var imageDestination = $(this).find('picture');

		  moveResourceImage(elementImage, imageDestination);

      $('<div class="title-wrapper">').appendTo($(this));
      $(this).find('.fsResourceTitle').appendTo($(this).find('.title-wrapper'));

		});


  }


  // ================================
  // Style Guide
  // ================================

  if($('.fsPageTitle').text() == 'Style Guide') {

    $($body).addClass('style-guide-page');

  }




});

/*!
 * global_vars is a file particular to your site
 * it contains base functions that are likely but not always used
**/


jQuery(function($) {

  var $body = $('body'),
      $navMain = $('.nav-main'),
      $navSub = $( '.nav-sub' ),
      $landingImage = $('.landing-image'),
      drawer = '#fsMenu',
      mobileBP = 600;


  // ================================
  // Navigation
  // ================================

  // Create a section title based on the current page

  var $navMain_level1 = $('.nav-main:first .fsNavLevel1'),
      $navSub_title = $navSub.find('> header > .fsElementTitle'),
      sectionTitle = $navMain_level1.find('> li[class*="fsNavCurrentPage"] > a').text()
  ;

  if (sectionTitle.length !== 0) {
    $navSub_title.html(sectionTitle);
  }

  if($navSub.find('nav .fsNavLevel1').length !== 0) {
      $navSub.removeClass( 'nav-sub-empty' );
  } else {
      $navSub.addClass( 'nav-sub-empty' );
  }

  // nav-sub - mobile toggle
  $navSub_title.click( function() {
    $(this).closest( $navSub ).toggleClass( 'active-nav' );
  });

  $(document).on('click', function(event) {
    if ( !$(event.target).closest( $navSub ).length ) {
        $navSub.removeClass( 'active-nav' );
    }
  });

  // ================================
  // Add tier toggles for off canvas navs
  // ================================

  $('<span class="sub-trigger"></span>').insertBefore('#fsMenu .off-canvas-nav .fsNavLevel1 > .fsNavParentPage > .fsNavPageInfo');
  $('<span class="sub-trigger"></span>').insertBefore('#fsMenu .off-canvas-nav .fsNavLevel2 > .fsNavParentPage > .fsNavPageInfo');
  $('<span class="sub-trigger"></span>').insertBefore('#fsMenu .off-canvas-nav .fsNavLevel3 > .fsNavParentPage > .fsNavPageInfo');

  $('.sub-trigger').click(function() {
      $(this).parent().toggleClass('active');
  });

  // ================================
  // Off Canvas Menu
  // ================================
  $('#fsPageWrapper').prepend([
      '<div class="drawer-ribbon">',
      '<button class="drawer-trigger" href="#">Menu</button>',
      '</div>'
    ].join('\n'));

  //append search and main nav to mobile menu

  // Toggle attribute of the body
  $('.drawer-trigger').click(function() {
    $body.toggleClass('drawer-is-active');
  });

  // Remove attribute on the bottom if anything other than
  // what is mentioned is clicked on
  $(document).on('click', function(event) {
    if (!$(event.target).closest('#fsMenu, .drawer-trigger, .next').length) {
      $body.removeClass('drawer-is-active');
    }
  });

  // ================================
  // Landing Page Images
  // ================================

     if ($('body:not(.fsComposeMode) .landing-image').length) {
        $($body).addClass('landing');
         var landingImage = $('.landing-image').find('img').attr('src');
          $($landingImage).css('background', 'url("' + landingImage + '") 50% 0 no-repeat');
          $($landingImage).insertAfter('#fsHeader');
          $($landingImage).find('img').hide();
          $('.fsPageTitle').appendTo('.landing-image .fsElementContent');
     }


  // ================================
  // Search
  // ================================

  // $('.search-trigger').click(function() {
  //     $body.toggleClass('search-active');
  //
  // });
  // // Hide if clicked outside
  // $(document).click(function(event) {
  //     if ($('body').hasClass('search-active') && !$(event.target).is('.mobile-search *, .top-search *, .search-trigger')) {
  //         $('body').removeClass('search-active');
  //     }
  // });

  $('.search-trigger').click(function() {
    $('body').toggleClass('search-active');

    //set focus to search element
    $('#fsHeader .top-search form input[type="text"]').focus();

    //when focus out of the form element close search
    $('#fsHeader .top-search form').on('focusout', function(e) {
      var $el = $(this);

      setTimeout(function() {
        if (!$el.find(':focus').length) {
          $el.off('focusout'); //detach event or it will stack everytime search is focused on
          $('body').removeClass('search-active');
        }
      });
    });

  });

  // Hide if clicked outside
  $(document).click(function(event) {
    if ($('body').hasClass('search-active') && !$(event.target).is('.mobile-search *, .top-search *, .search-trigger')) {
      $('body').removeClass('search-active');
    }
  });

  // ================================
  // News List
  // ================================

  (function() {
    var body = $(document.body),
      update = function(article) {
        var date = article.find('.fsDateTime'),
          title = article.find('.fsTitle'),
          thumb = article.find('.fsThumbnail')
          ;

        date.insertBefore(title);

        if (!body.hasClass('home')) {
          date.insertBefore(thumb);
        }

        article.addClass('element-updated');
      };

    $('.fsNews article:not(.element-updated), .fsPostElement article:not(.element-updated)').each(function(){
      update($(this));
    });

    // if (!body.hasClass('fsComposeMode') && !body.hasClass('home')) {
    //   $('.fsNews article, .fsPostElement article').each(function(){
    //     update($(this));
    //   });
    // } else if (body.hasClass('home')) {
    //   $('.fsNews article, .fsPostElement article').each(function(){
    //     update($(this));
    //   });
    // }

    if ($('.fsNews, .fsPostElement').length) {
      if (typeof FS === 'object' && FS.hasOwnProperty('events')) {
        if (FS.events.hasOwnProperty('onElementDialogShown')) {
          FS.events.onElementDialogShown('Post', function( post ) {
            update(post.find('article:not(.element-updated)'));
          });

          FS.events.onElementDialogShown('News', function( news ) {
            update(news.find('article:not(.element-updated)'));
          });
        }
      }

     $( document ).ajaxComplete(function( e, xhr, settings ) {
        var url = settings.url,
          id = null,
          fragment,
          load_more,
          start,
          end
          ;

        if (url.length) {
          start = url.indexOf('parent_id');
          load_more = url.indexOf('is_load_more=true');

          if (start !== -1 && load_more !== -1) {
            fragment = url.substring(start + 10);

            if (fragment.length) {
              end = fragment.indexOf('&');

              if (end === -1) {
                id = fragment;
              } else {
                id = fragment.substring(0, end);
              }
            }
          }
        }

        if (id !== null && id.length) {
          var linked = $('#fsEl_' + id);

          if (linked.length) {
            linked.find('article:not(.element-updated)').each(function() {
              update($(this));
            });
          }
        }
      });
    }
  })();

  // ================================
  // Responsive Built-in sliders
  // ================================

  // the following takes care of the news/calendar slideshow option
  // and makes them responsive

  var _$targets,
    options = {
      'arrows': true,
      'mobileFirst': true,
      'slidesToShow': 1,
      'slidesToScroll': 1,
      'adaptiveHeight': true,
      'responsive': [
          {
              'breakpoint': 600,
              'settings': {
                  'slidesToShow': 2,
                  'slidesToScroll': 1
              }
          },
          {
              'breakpoint': 900,
              'settings': {
                  'slidesToShow': 3,
                  'slidesToScroll': 1
              }
          },
          {
              'breakpoint': 1180,
              'settings': {
                  'slidesToShow': 3,
                  'slidesToScroll': 1
              }
          }
      ]
    }
    ;

  _$targets = $( '.fsCalendar.fsSlideshow, .fsNews.fsSlideshow, .fsPostElement.fsSlideshow' );

  if ( _$targets.length ) {
    _$targets.each( function ( index, element ) {
      var checkEach = setInterval(function() {
        if (_$targets[0].classList.contains("fsCalendar")) {
          clearInterval(checkEach);

          _$targets.find(".slick-track").attr("title","Slideshow of calendar events");
        } else if (_$targets[0].classList.contains("fsNews")) {
          clearInterval(checkEach);

          _$targets.find(".slick-track").attr("title","Slideshow of news articles");
        }
      },100);

      if (!_$targets.find(".fsPager, .slick-dots").length) {
        _$targets.find("article").each(function () {
          var $slide = $(this);

          if ($slide.attr('aria-describedby') !== undefined) { // ignore extra/cloned slides
            $(this).find(".fsTitle").attr('id', $slide.attr('aria-describedby') + '-index');
          }
        });
      }

      var _$carousel = $( element ).find( '.fsElementSlideshow')
          ;

      for (var property in options ) {
        if( options.hasOwnProperty( property ) ) {
            _$carousel.slick( 'setOption', property, options[property], true );
        }
      }
    });
  }

  //ADA google translate
  var checkTranslate = setInterval(function() {
    if($("#google_translate_element select.goog-te-combo").length) {
      clearInterval(checkTranslate);

      if((!$("#google_translate_element select.goog-te-combo").parent()[0].length && $("#google_translate_element select.goog-te-combo").parent()[0].tagName !== "LABEL") && (!$("#google_translate_element select.goog-te-combo").prev().length || $("#google_translate_element select.goog-te-combo").prev()[0].tagName !== "LABEL")) {
        $("#google_translate_element select.goog-te-combo").before('<label for="select-translate">Translate Website</label>');
        $("#google_translate_element select.goog-te-combo").attr("id","select-translate");
      }
    }
  },200);

  //ADA Menu
  if ($("body:not(.fsDraftMode)").length) {
    $("#fsHeader .nav-main .fsNavLevel1").accessibility_menu();
    $("#fsHeader .nav-main .fsNavLevel1 > li.fsNavParentPage").doubleTapToGo();

    $("#fsHeader .nav-quick .fsNavLevel1").accessibility_menu({
      mainMenuLabel: "Quicklinks Menu"
    });
    $("#fsHeader .nav-quick .fsNavLevel1 > li.fsNavParentPage").doubleTapToGo();
  }

  // Label Sections
  $('section').each(function(e) {
    var section = $(this),
      title = section.find('> header > .fsElementTitle')
      ;

    if ( typeof section.attr('aria-label') == 'undefined' && title.length ) {
      section.attr('aria-label', title.text());
    }
  });

  // Add H1 if none exists
  if (!$('.fsPageTitle').length) {
    var pageTitle = $('html > head > title');

    if (pageTitle.length) {
      $('#fsPageWrapper').prepend('<h1>' + pageTitle.text() + '</h1>');
    }
  }

  // Add skip to content link
  var skiplink = $('<a href="#fsPageContent" class="skip-link">Skip to Main Content</a>');
  $('#fsPageWrapper').prepend(skiplink);

  $('.slick-dots li[aria-controls]').removeAttr('aria-controls');
});


function backgroundImage(e){backgroundElement=e,$(backgroundElement).each(function(){var e=$(this).find("img").attr("src");$(this).css("background-image",'url("'+e+'")')})}function moveResourceImage(e,t){if(0===e.length||0===t.length)return!1;var n=$(e).eq(0),i=n.attr("data-image-sizes"),a=n.attr("data-aspect-ratio");$(t).eq(0).attr("data-image-sizes",i).attr("data-aspect-ratio",a),FS.util.updateDynamicImages($(t).eq(0))}function date(){var e,t,n=".date-container",i=new Date,a=i.getYear(),r=i.getDay(),s=i.getMonth(),l=i.getDate(),o=i.getHours();e=o%12||12,t=o<12?"am":"pm";var c=i.getMinutes()<10?"0"+i.getMinutes():i.getMinutes();a<1e3&&(a+=1900),l<10&&(l="0"+l);var d=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"),f=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"),u='<div class="date"><div class="day">'+d[r]+',</div><div class="month"> '+f[s]+" "+l+'</div><div class="time">'+e+":"+c+" "+t+"</div></div>";$(n).html(u)}function debounce(e,t,n){var i;return function(){var a=this,r=arguments,s=function(){i=null,n||e.apply(a,r)},l=n&&!i;clearTimeout(i),i=setTimeout(s,t),l&&e.apply(a,r)}}function placeholder(e,t){"use strict";var n,i,a=100,r=100;n=function s(){e.find("input.gsc-input").length?$.support.placeholder?e.find("input.gsc-input").attr("placeholder",t):e.find("input.gsc-input").attr("value",t):a>0&&(i=setTimeout(s,r),a-=1)},i=setTimeout(n,r)}function nano(e,t){return e.replace(/\{([\w\.]*)\}/g,function(e,n){for(var i=n.split("."),a=t[i.shift()],r=0,s=i.length;r<s;r++)a=a[i[r]];return"undefined"!=typeof a&&null!==a?a:""})}if($(".fsCalendar.fsGrid").length){$(".fsCalendar.fsGrid").addClass("smallCal");var eventview,scrollUp,onClickGridEvent=function(e){var t,n,i=$(e.target).closest(".fsCalendarDaybox");n=i.clone(),t=eventview.offset().top-16,$(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"),eventview.empty().append(n),i.addClass("selected"),$("html,body").animate({scrollTop:t},450)},onClickScrollUp=function(){var e=$(".fsCalendarMonthBrowser").offset().top-16;$("html,body").animate({scrollTop:e},450)},onAJAXSuccess=function(e,t,n,i){var a=$(i).hasClass("fsCalendar fsGrid");a&&initCalendar()},initCalendar=function(){eventview=$('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"),scrollUp=$('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview),scrollUp.on("click",onClickScrollUp),$(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"),$(".fsCalendarEventGrid").on("click",".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ",onClickGridEvent)};$(document).ajaxSuccess(onAJAXSuccess),initCalendar()}$(function(e){var t=2,n=e(".nav-main .fsNavLevel2"),i="li",a="sub-list";n.each(function(){for(var n=new Array,r=e(this).find(i),s=Math.floor(r.length/t),l=r.length-s*t,o=0;o<t;o++)o<l?n[o]=s+1:n[o]=s;for(var o=0;o<t;o++){e(this).append(e("<ul ></ul>").addClass(a));for(var c=0;c<n[o];c++){for(var d=0,f=0;f<o;f++)d+=n[f];e(this).find("."+a).last().append(r[c+d])}}})}),function(e,t,n,i){e.fn.doubleTapToGo=function(i){return!!("ontouchstart"in t||navigator.msMaxTouchPoints||navigator.userAgent.toLowerCase().match(/windows phone os 7/i))&&(t.isTouching=!1,this.each(function(i){var a=!1;e(this).on("touchstart",function(e){"touchstart"===e.type&&(t.isTouching=!0)}),e(this).on("click",function(n){var i=e(this);i[0]!=a[0]&&t.isTouching===!0&&(n.preventDefault(),a=i),t.isTouching=!1}),e(n).on("click touchstart MSPointerDown",function(t){for(var n=!0,i=e(t.target).parents(),r=0;r<i.length;r++)i[r]==a[0]&&(n=!1);n&&(a=!1)})}),this)}}(jQuery,window,document),function(e){"use strict";function t(t,n){var i=this,a={mediaTemplate:['<article class="universal-slide">','<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />','<div class="caption-wrapper">','<div class="caption-title">{captionTitle}</div>','<div class="caption-desc">{captionDesc}</div>',"</div>","</article>"],bp:600,callback:null,url:null};i.element=t,i.container=t,i.settings=e.extend(!0,{},a,n),i.url="",i.init()}function n(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}t.prototype={init:function(){var e=this;e.element.classList.contains("fsMedia")?(e.container=e.element.getElementsByClassName("fsMediaCustomPlayer")[0],e.url=e.container.getAttribute("data-playlisturl")):e.settings.url&&(e.url=e.settings.url),e.html=Array.isArray(e.settings.mediaTemplate)?e.settings.mediaTemplate.join("\n"):e.settings.mediaTemplate,e.getContent()},getContent:function(){var t=this;e.getJSON(t.url).done(function(e){for(var i=e.objects,a=0;a<i.length;a++){var r=n(nano(t.html,{imgSrc:window.innerWidth>t.settings.bp?i[a].full_path:i[a].mobile_path,captionTitle:i[a].object_title,captionDesc:i[a].object_description}));0==r.textContent.trim().length&&r.getElementsByClassName("caption-wrapper").length&&r.getElementsByClassName("caption-wrapper")[0].classList.add("is-empty"),t.container.appendChild(r)}t.callback()})},callback:function(){var e=this;"function"==typeof e.settings.callback&&e.settings.callback.call()}},e.fn.mediaPull=function(e){this.each(function(){new t(this,e)})}}(jQuery),function(e){"use strict";function t(t,n){var i,a=this;a.element=t,a.isMedia=!1,a.html="",i={slidesToShow:1,accessibility:!0,dots:!0,arrows:!0,infinite:!0,autoplay:!1,pauseOnHover:!1,adaptiveHeight:!0},a.defaults={mediaTemplate:['<article class="universal-slide">','<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />','<div class="caption-wrapper">','<div class="caption-title">{captionTitle}</div>','<div class="caption-desc">{captionDesc}</div>',"</div>","</article>"],slick:i,bp:600,preSlickCallback:null,callback:null},a.settings=e.extend(!0,{},a.defaults,n),a.init()}function n(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}function i(t){t.classList.toggle("slider-playing"),t.classList.toggle("slider-paused"),t.classList.contains("slider-playing")?e(t).slick("slickPlay"):e(t).slick("slickPause")}t.prototype={init:function(){var t=this;t.element.classList.contains("fsMedia")?t.isMedia=!0:t.element.classList.contains("fsMediaCustomPlayer")&&(t.element=e(t.element).parents(".fsMedia")[0],t.isMedia=!0),t.slider=t.isMedia?t.element.getElementsByClassName("fsMediaCustomPlayer")[0]:t.element,t.slider.classList.add("fsCustomSlider"),t.html=Array.isArray(t.settings.mediaTemplate)?t.settings.mediaTemplate.join("\n"):t.settings.mediaTemplate,t.isMedia?t.sliderPrep():document.body.classList.contains("fsDraftMode")||t.slickInit()},sliderPrep:function(){var t=this;e(t.element).mediaPull({mediaTemplate:t.settings.mediaTemplate,bp:t.settings.bp,callback:function(){t.slickInit()}})},slickInit:function(){var t=this,a=e(t.slider);a.on("init",function(e,a){var r=n("<button class='slider-play-btn'>Play</button>");r.addEventListener("click",function(){i(t.slider)}),t.slider.insertBefore(r,t.slider.firstChild),a.options.autoplay?t.slider.classList.add("slider-playing"):t.slider.classList.add("slider-paused"),"function"==typeof t.settings.callback&&t.settings.callback.call(t,t.element)}),"function"==typeof t.settings.preSlickCallback&&t.settings.preSlickCallback.call(t,t.element),a.slick(t.settings.slick)}},e.fn.mediaSlider=function(e){this.each(function(){new t(this,e)})}}(jQuery),function(e){"use strict";var t={48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};e.fn.accessibility_menu=function(n){var i=e.extend({menuClass:"menu-item-open",mainMenuLabel:"Main Menu",mainMenuRole:"navigation",topMenuRole:"menubar",listItemsRole:"menuitem",subNavRole:"menu",firstTab:"level2"},n),a=e(this),r=".fsNavPageInfo",s=".fsNavLevel1",l='ul[class^="fsNavLevel"]',o=".fsNavPageDescription",c=a.find("> li > a");e(this).parent().attr("role",i.mainMenuRole).attr("aria-label",i.mainMenuLabel),e(this).attr("role",i.topMenuRole).find("li").attr("role",i.listItemsRole),e(this).find(l).attr("role",i.subNavRole),e(this).find(r).find("a").attr("tabIndex",-1),e(c).each(function(){e(this).next(r).length>0&&e(this).parent("li").attr("aria-haspopup","true").find(r).attr("aria-hidden","true")}),e(c).bind("focus mouseenter mouseleave",function(){var t=new Array;if(e(this).parents(s).find("> li > a").removeAttr("tabindex"),e(this).parents(s).find("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabindex",-1),e(this).next(r).attr("aria-hidden","false").parent("li").addClass(i.menuClass),t.push(e(this)[0]),"level2"==i.firstTab){if(e(this).next(r).find(l).find("a").length)for(var n=0;n<e(this).next(r).find(l).find("a").length;n++)t.push(e(this).next(r).find(l).find("a")[n]);if(e(this).next(r).find(o).find("a").length)for(var a=0;a<e(this).next(r).find(o).find("a").length;a++)t.push(e(this).next(r).find(o).find("a")[a])}else if("pagedesc"==i.firstTab){if(e(this).next(r).find(o).find("a").length)for(var c=0;c<e(this).next(r).find(o).find("a").length;c++)t.push(e(this).next(r).find(o).find("a")[c]);if(e(this).next(r).find(l).find("a").length)for(var d=0;d<e(this).next(r).find(l).find("a").length;d++)t.push(e(this).next(r).find(l).find("a")[d])}for(var f=0;f<t.length;f++)t[f].setAttribute("tabindex",f)}),e(this).on("mouseleave",function(){e(this).find("> li > a").removeAttr("tabindex"),e(this).find("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)}),e(c).keydown(function(n){var a=e(this).parent("li").find(r).find("a").length;if(38==n.keyCode)n.preventDefault(),e(this).parent("li").find(r).find("a").length&&e(this).parent("li").find(r).find("a[tabindex="+a+"]").focus();else if(39==n.keyCode)n.preventDefault(),0==e(this).parent("li").next("li").length?e(this).parents(s).find("> li").first().find("a").first().focus():e(this).parent("li").next("li").find("a").first().focus();else if(40==n.keyCode)e(this).parent("li").find(r).find("a").length&&(n.preventDefault(),e(this).parent("li").addClass(i.menuClass).find(r).attr("aria-hidden","false"),e(this).parent("li").find("a[tabindex=1]").focus());else if(37==n.keyCode)n.preventDefault(),0==e(this).parent("li").prev("li").length?e(this).parents(s).find("> li").last().find("a").first().focus():e(this).parent("li").prev("li").find("a").first().focus();else if(9==n.keyCode)if(n.shiftKey)if(0==e(this).parent("li").prev("li").length)e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1);else if(e(this).parent("li").prev("li").length){n.preventDefault();var l=e(this).parent("li").prev("li").find(r).find("a").length;e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1),e(this).parent("li").prev("li").addClass(i.menuClass).find(r).attr("aria-hidden","false"),e(this).parent("li").prev("li").find(">a").focus().parent().find(r).find("a[tabindex="+l+"]").focus()}else e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1);else e(this).parent("li").find(r).find("a").length&&(n.preventDefault(),e(this).parent("li").addClass(i.menuClass).find(r).attr("aria-hidden","false"),e(this).parent("li").find("a[tabindex=1]").focus());else 32==n.keyCode?(n.preventDefault(),window.location=e(this).attr("href")):27==n.keyCode?(n.preventDefault(),e("."+i.menuClass).removeClass(i.menuClass).find("> a").removeAttr("tabindex").parent("li").find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)):e(this).parent("li").find(r+"[aria-hidden=false] a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),!1})});var d=e(this).find(r).find("a");e(d).bind("focus mouseenter mouseleave",function(){e(this).parent().parent().find("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true"),e(this).next(r).attr("aria-hidden","false").parentsUntil(s,"li").addClass(i.menuClass)}),e(d).keydown(function(n){var a=e(this).parents(r).find("a").length,l=parseInt(e(this).attr("tabindex"));if(38==n.keyCode)n.preventDefault(),1==l?e(this).parents(r).parent("li").find("a").first().focus():e(this).parents(r).find("a[tabindex="+(l-1)+"]").parentsUntil(s,"li").addClass(i.menuClass).find("a[tabindex="+(l-1)+"]").focus();else if(39==n.keyCode)n.preventDefault(),0==e(this).parents(s).find("a[tabindex='0']").parent("li").next("li").length?e(this).parents(s).find("> li").first().find("a").first().focus():e(this).parents(s).find("a[tabindex='0']").parent("li").next("li").find("a").first().focus();else if(40==n.keyCode)n.preventDefault(),l==a?e(this).parents(r).parent("li").find("a").first().focus():e(this).parents(r).find("a[tabindex="+(l+1)+"]").focus();else if(27==n.keyCode||37==n.keyCode)n.preventDefault(),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true"),e(this).parentsUntil(s,"li").find("a").first().focus();else if(9==n.keyCode)n.shiftKey?(n.preventDefault(),1==l?e(this).parents(r).parent("li").find("a").first().focus():e(this).parents(r).find("a[tabindex="+(l-1)+"]").parentsUntil(s,"li").addClass(i.menuClass).find("a[tabindex="+(l-1)+"]").focus()):l==a?e(this).parents(r).parent("li").next("li").length?(n.preventDefault(),e(this).parents(r).parent("li").next("li").find("a").first().focus()):(e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)):(n.preventDefault(),e(this).parents(r).find("a[tabindex="+(l+1)+"]").focus());else if(32==n.keyCode)n.preventDefault(),window.location=e(this).attr("href");else{var o=!1;e(this).parent("li").nextAll("li").find("a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),o=!0,!1}),o||e(this).parent("li").prevAll("li").find("a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),!1})}}),e(document).click(function(){e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)}),e(this).click(function(e){e.stopPropagation()})}}(jQuery),window.Modernizr=function(e,t,n){function i(e){y.cssText=e}function a(e,t){return typeof e===t}function r(e,t){return!!~(""+e).indexOf(t)}function s(e,t){for(var i in e){var a=e[i];if(!r(a,"-")&&y[a]!==n)return"pfx"!=t||a}return!1}function l(e,t,i){for(var r in e){var s=t[e[r]];if(s!==n)return i===!1?e[r]:a(s,"function")?s.bind(i||t):s}return!1}function o(e,t,n){var i=e.charAt(0).toUpperCase()+e.slice(1),r=(e+" "+k.join(i+" ")+i).split(" ");return a(t,"string")||a(t,"undefined")?s(r,t):(r=(e+" "+w.join(i+" ")+i).split(" "),l(r,t,n))}var c,d,f,u="2.8.3",p={},h=!0,m=t.documentElement,v="modernizr",g=t.createElement(v),y=g.style,C={}.toString,b=" -webkit- -moz- -o- -ms- ".split(" "),x="Webkit Moz O ms",k=x.split(" "),w=x.toLowerCase().split(" "),T={svg:"http://www.w3.org/2000/svg"},E={},M=[],S=M.slice,D=function(e,n,i,a){var r,s,l,o,c=t.createElement("div"),d=t.body,f=d||t.createElement("body");if(parseInt(i,10))for(;i--;)l=t.createElement("div"),l.id=a?a[i]:v+(i+1),c.appendChild(l);return r=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),c.id=v,(d?c:f).innerHTML+=r,f.appendChild(c),d||(f.style.background="",f.style.overflow="hidden",o=m.style.overflow,m.style.overflow="hidden",m.appendChild(f)),s=n(c,e),d?c.parentNode.removeChild(c):(f.parentNode.removeChild(f),m.style.overflow=o),!!s},$=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var i;return D("@media "+t+" { #"+v+" { position: absolute; } }",function(t){i="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),i},A={}.hasOwnProperty;f=a(A,"undefined")||a(A.call,"undefined")?function(e,t){return t in e&&a(e.constructor.prototype[t],"undefined")}:function(e,t){return A.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=S.call(arguments,1),i=function(){if(this instanceof i){var a=function(){};a.prototype=t.prototype;var r=new a,s=t.apply(r,n.concat(S.call(arguments)));return Object(s)===s?s:r}return t.apply(e,n.concat(S.call(arguments)))};return i}),E.flexbox=function(){return o("flexWrap")},E.flexboxlegacy=function(){return o("boxDirection")},E.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:D(["@media (",b.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},E.cssanimations=function(){return o("animationName")},E.csscolumns=function(){return o("columnCount")},E.csstransforms=function(){return!!o("transform")},E.csstransforms3d=function(){var e=!!o("perspective");return e&&"webkitPerspective"in m.style&&D("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},E.csstransitions=function(){return o("transition")},E.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(i){}return n},E.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(i){}return n},E.svg=function(){return!!t.createElementNS&&!!t.createElementNS(T.svg,"svg").createSVGRect},E.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==T.svg},E.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(C.call(t.createElementNS(T.svg,"clipPath")))};for(var N in E)f(E,N)&&(d=N.toLowerCase(),p[d]=E[N](),M.push((p[d]?"":"no-")+d));return p.addTest=function(e,t){if("object"==typeof e)for(var i in e)f(e,i)&&p.addTest(i,e[i]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof h&&h&&(m.className+=" "+(t?"":"no-")+e),p[e]=t}return p},i(""),g=c=null,function(e,t){function n(e,t){var n=e.createElement("p"),i=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function a(e){var t=g[e[m]];return t||(t={},v++,e[m]=v,g[v]=t),t}function r(e,n,i){if(n||(n=t),d)return n.createElement(e);i||(i=a(n));var r;return r=i.cache[e]?i.cache[e].cloneNode():h.test(e)?(i.cache[e]=i.createElem(e)).cloneNode():i.createElem(e),!r.canHaveChildren||p.test(e)||r.tagUrn?r:i.frag.appendChild(r)}function s(e,n){if(e||(e=t),d)return e.createDocumentFragment();n=n||a(e);for(var r=n.frag.cloneNode(),s=0,l=i(),o=l.length;s<o;s++)r.createElement(l[s]);return r}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?r(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function o(e){e||(e=t);var i=a(e);return y.shivCSS&&!c&&!i.hasCSS&&(i.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||l(e,i),e}var c,d,f="3.7.0",u=e.html5||{},p=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,m="_html5shiv",v=0,g={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,d=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,d=!0}}();var y={elements:u.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:f,shivCSS:u.shivCSS!==!1,supportsUnknownElements:d,shivMethods:u.shivMethods!==!1,type:"default",shivDocument:o,createElement:r,createDocumentFragment:s};e.html5=y,o(t)}(this,t),p._version=u,p._prefixes=b,p._domPrefixes=w,p._cssomPrefixes=k,p.mq=$,p.testProp=function(e){return s([e])},p.testAllProps=o,p.testStyles=D,m.className=m.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(h?" js "+M.join(" "):""),p}(this,this.document),function(e,t,n){function i(e){return"[object Function]"==v.call(e)}function a(e){return"string"==typeof e}function r(){}function s(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function l(){var e=g.shift();y=1,e?e.t?h(function(){("c"==e.t?u.injectCss:u.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),l()):y=0}function o(e,n,i,a,r,o,c){function d(t){if(!p&&s(f.readyState)&&(C.r=p=1,!y&&l(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&h(function(){x.removeChild(f)},50);for(var i in M[n])M[n].hasOwnProperty(i)&&M[n][i].onload()}}var c=c||u.errorTimeout,f=t.createElement(e),p=0,v=0,C={t:i,s:n,e:r,a:o,x:c};1===M[n]&&(v=1,M[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){d.call(this,v)},g.splice(a,0,C),"img"!=e&&(v||2===M[n]?(x.insertBefore(f,b?null:m),h(d,c)):M[n].push(f))}function c(e,t,n,i,r){return y=0,t=t||"j",a(e)?o("c"==t?w:k,e,t,this.i++,n,i,r):(g.splice(this.i++,0,e),1==g.length&&l()),this}function d(){var e=u;return e.loader={load:c,i:0},e}var f,u,p=t.documentElement,h=e.setTimeout,m=t.getElementsByTagName("script")[0],v={}.toString,g=[],y=0,C="MozAppearance"in p.style,b=C&&!!t.createRange().compareNode,x=b?p:m.parentNode,p=e.opera&&"[object Opera]"==v.call(e.opera),p=!!t.attachEvent&&!p,k=C?"object":p?"script":"img",w=p?"script":k,T=Array.isArray||function(e){return"[object Array]"==v.call(e)},E=[],M={},S={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};u=function(e){function t(e){var t,n,i,e=e.split("!"),a=E.length,r=e.pop(),s=e.length,r={url:r,origUrl:r,prefixes:e};for(n=0;n<s;n++)i=e[n].split("="),(t=S[i.shift()])&&(r=t(r,i));for(n=0;n<a;n++)r=E[n](r);return r}function s(e,a,r,s,l){var o=t(e),c=o.autoCallback;o.url.split(".").pop().split("?").shift(),o.bypass||(a&&(a=i(a)?a:a[e]||a[s]||a[e.split("/").pop().split("?")[0]]),o.instead?o.instead(e,a,r,s,l):(M[o.url]?o.noexec=!0:M[o.url]=1,r.load(o.url,o.forceCSS||!o.forceJS&&"css"==o.url.split(".").pop().split("?").shift()?"c":n,o.noexec,o.attrs,o.timeout),(i(a)||i(c))&&r.load(function(){d(),a&&a(o.origUrl,l,s),c&&c(o.origUrl,l,s),M[o.url]=2})))}function l(e,t){function n(e,n){if(e){if(a(e))n||(f=function(){var e=[].slice.call(arguments);u.apply(this,e),p()}),s(e,f,t,0,c);else if(Object(e)===e)for(o in l=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(o)&&(!n&&!--l&&(i(f)?f=function(){var e=[].slice.call(arguments);u.apply(this,e),p()}:f[o]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(u[o])),s(e[o],f,t,o,c))}else!n&&p()}var l,o,c=!!e.test,d=e.load||e.both,f=e.callback||r,u=f,p=e.complete||r;n(c?e.yep:e.nope,!!d),d&&n(d)}var o,c,f=this.yepnope.loader;if(a(e))s(e,0,f,0);else if(T(e))for(o=0;o<e.length;o++)c=e[o],a(c)?s(c,0,f,0):T(c)?u(c):Object(c)===c&&l(c,f);else Object(e)===e&&l(e,f)},u.addPrefix=function(e,t){S[e]=t},u.addFilter=function(e){E.push(e)},u.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",f=function(){t.removeEventListener("DOMContentLoaded",f,0),t.readyState="complete"},0)),e.yepnope=d(),e.yepnope.executeStack=l,e.yepnope.injectJs=function(e,n,i,a,o,c){var d,f,p=t.createElement("script"),a=a||u.errorTimeout;p.src=e;for(f in i)p.setAttribute(f,i[f]);n=c?l:n||r,p.onreadystatechange=p.onload=function(){!d&&s(p.readyState)&&(d=1,n(),p.onload=p.onreadystatechange=null)},h(function(){d||(d=1,n(1))},a),o?p.onload():m.parentNode.insertBefore(p,m)},e.yepnope.injectCss=function(e,n,i,a,s,o){var c,a=t.createElement("link"),n=o?l:n||r;a.href=e,a.rel="stylesheet",a.type="text/css";for(c in i)a.setAttribute(c,i[c]);s||(m.parentNode.insertBefore(a,m),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},$.fn.randomize=function(e){var t=e?$(this).find(e):$(this).children(),n=t.parent();return n.each(function(){$(this).children(e).sort(function(){return Math.round(Math.random())-.5}).detach().appendTo(this)}),this};