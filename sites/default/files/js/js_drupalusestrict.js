(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.backtotop = {
    attach: function (context, settings) {

      var $backToTop = $('.uikit-back-to-top');

      $(document).bind('scroll', function () {
        if ($(document).scrollTop() > 1000) {
          $backToTop.addClass('isVisible');
        } else {
          $backToTop.removeClass('isVisible');
        }
      });

      $backToTop.click(function () {
        $('html,body', context).stop().animate({
          scrollTop: 0
        }, 'slow', 'swing');
      });
    }

  };
})(jQuery, Drupal, this, this.document);
;
(function ($) {

  Drupal.behaviors.facetapi = {
    attach: function(context, settings) {
      // Iterates over facet settings, applies functionality like the "Show more"
      // links for block realm facets.
      // @todo We need some sort of JS API so we don't have to make decisions
      // based on the realm.
      if (settings.facetapi) {
        for (var index in settings.facetapi.facets) {
          if (null != settings.facetapi.facets[index].makeCheckboxes) {
            Drupal.facetapi.makeCheckboxes(settings.facetapi.facets[index].id);
          }
          if (null != settings.facetapi.facets[index].limit) {
            // Applies soft limit to the list.
            Drupal.facetapi.applyLimit(settings.facetapi.facets[index]);
          }
        }
      }
    }
  };

  /**
   * Class containing functionality for Facet API.
   */
  Drupal.facetapi = {};

  /**
   * Applies the soft limit to facets in the block realm.
   */
  Drupal.facetapi.applyLimit = function(settings) {
    if (settings.limit > 0 && !$('ul#' + settings.id).hasClass('facetapi-processed')) {
      // Only process this code once per page load.
      $('ul#' + settings.id).addClass('facetapi-processed');

      // Ensures our limit is zero-based, hides facets over the limit.
      var limit = settings.limit - 1;
      $('ul#' + settings.id).find('li:gt(' + limit + ')').hide();

      // Adds "Show more" / "Show fewer" links as appropriate.
      $('ul#' + settings.id).filter(function() {
        return $(this).find('li').length > settings.limit;
      }).each(function() {
        $('<a href="#" class="facetapi-limit-link"></a>').text(settings.showMoreText).click(function() {
          if ($(this).hasClass('open')) {
            $(this).siblings().find('li:gt(' + limit + ')').slideUp();
            $(this).removeClass('open').text(settings.showMoreText);
          }
          else {
            $(this).siblings().find('li:gt(' + limit + ')').slideDown();
            $(this).addClass('open').text(Drupal.t(settings.showFewerText));
          }
          return false;
        }).insertAfter($(this));
      });
    }
  };

  /**
   * Constructor for the facetapi redirect class.
   */
  Drupal.facetapi.Redirect = function(href) {
    this.href = href;
  };

  /**
   * Method to redirect to the stored href.
   */
  Drupal.facetapi.Redirect.prototype.gotoHref = function() {
    window.location.href = this.href;
  };

  /**
   * Turns all facet links into checkboxes.
   * Ensures the facet is disabled if a link is clicked.
   */
  Drupal.facetapi.makeCheckboxes = function(facet_id) {
    var $facet = $('#' + facet_id),
        $items = $('a.facetapi-checkbox, span.facetapi-checkbox', $facet);

    // Find all checkbox facet links and give them a checkbox.
    $items.once('facetapi-makeCheckbox').each(Drupal.facetapi.makeCheckbox);
    $items.once('facetapi-disableClick').click(function (e) {
      Drupal.facetapi.disableFacet($facet);
    });
  };

  /**
   * Disable all facet links and checkboxes in the facet and apply a 'disabled'
   * class.
   */
  Drupal.facetapi.disableFacet = function ($facet) {
    var $elem = $(this);
    // Apply only for links.
    if ($elem[0].tagName == 'A') {
      $facet.addClass('facetapi-disabled');
      $('a.facetapi-checkbox').click(Drupal.facetapi.preventDefault);
      $('input.facetapi-checkbox', $facet).attr('disabled', true);
    }
  };

  /**
   * Event listener for easy prevention of event propagation.
   */
  Drupal.facetapi.preventDefault = function (e) {
    e.preventDefault();
  };

  /**
   * Replace an unclick link with a checked checkbox.
   */
  Drupal.facetapi.makeCheckbox = function() {
    var $elem = $(this),
        active = $elem.hasClass('facetapi-active');

    if (!active && !$elem.hasClass('facetapi-inactive')) {
      // Not a facet element.
      return;
    }

    // Derive an ID and label for the checkbox based on the associated link.
    // The label is required for accessibility, but it duplicates information
    // in the link itself, so it should only be shown to screen reader users.
    var id = this.id + '--checkbox',
        description = $elem.find('.element-invisible').html(),
        label = $('<label class="element-invisible" for="' + id + '">' + description + '</label>');

    // Link for elements with count 0.
    if ($elem[0].tagName == 'A') {
      var checkbox = $('<input type="checkbox" class="facetapi-checkbox" id="' + id + '" />'),
        // Get the href of the link that is this DOM object.
        href = $elem.attr('href'),
        redirect = new Drupal.facetapi.Redirect(href);
    }
    // Link for elements with count more than 0.
    else {
      var checkbox = $('<input disabled type="checkbox" class="facetapi-checkbox" id="' + id + '" />');
    }

    checkbox.click(function (e) {
      Drupal.facetapi.disableFacet($elem.parents('ul.facetapi-facetapi-checkbox-links'));
      redirect.gotoHref();
    });

    if (active) {
      checkbox.attr('checked', true);
      // Add the checkbox and label, hide the link.
      $elem.before(label).before(checkbox).hide();
    }
    else {
      $elem.before(label).before(checkbox);
    }
  };

})(jQuery);
;
!function(t,e,i,a){"use strict";e.facetapi&&(e.facetapi.makeCheckbox=function(){var i=t(this),a=i.hasClass("facetapi-active"),c=t(this).parent("li");if(a||i.hasClass("facetapi-inactive")){var n=this.id+"--checkbox",r=t('<label class="uikit-control-input" for="'+n+'"><div class="uikit-control-input__text"></div></label>'),s=t('<input type="checkbox" class="facetapi-checkbox uikit-control-input__input" id="'+n+'" />'),o=i.attr("href"),p=new e.facetapi.Redirect(o);s.click(function(t){e.facetapi.disableFacet(i.parents("ul.facetapi-facetapi-checkbox-links")),p.gotoHref()}),r.prepend(s),c.prepend(r),a?(i.remove(),r.find("div").text(c.text())):(i.find(".element-invisible").remove(),r.find("div ").text(i.text()),i.remove()),c.contents().filter(function(){return 3==this.nodeType}).first().replaceWith(""),a&&s.attr("checked",!0)}})}(jQuery,Drupal,0,this.document);;
/*
 * Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget.
 *
 * Copyright (c) 2008 Joel Birch - based mostly on work by Jesse Klaasse and credit goes largely to him.
 * Special thanks to Karl Swedberg for valuable input.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */
/*
 * This is not the original jQuery Supposition plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.supposition = function(){
    var $w = $(window), /*do this once instead of every onBeforeShow call*/
    _offset = function(dir) {
      return window[dir == 'y' ? 'pageYOffset' : 'pageXOffset']
      || document.documentElement && document.documentElement[dir=='y' ? 'scrollTop' : 'scrollLeft']
      || document.body[dir=='y' ? 'scrollTop' : 'scrollLeft'];
    },
    onHide = function(){
      this.css({bottom:''});
    },
    onBeforeShow = function(){
      this.each(function(){
        var $u = $(this);
        $u.css('display','block');
        var $mul = $u.closest('.sf-menu'),
        level = $u.parents('ul').length,
        menuWidth = $u.width(),
        menuParentWidth = $u.closest('li').outerWidth(true),
        menuParentLeft = $u.closest('li').offset().left,
        totalRight = $w.width() + _offset('x'),
        menuRight = $u.offset().left + menuWidth,
        exactMenuWidth = (menuRight > (menuParentWidth + menuParentLeft)) ? menuWidth - (menuRight - (menuParentWidth + menuParentLeft)) : menuWidth;
        if ($u.parents('.sf-js-enabled').hasClass('rtl')) {
          if (menuParentLeft < exactMenuWidth) {
            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)){
              $u.css({left:0,right:'auto'});
            }
            else {
              $u.css({left:menuParentWidth + 'px',right:'auto'});
            }
          }
        }
        else {
          if (menuRight > totalRight && menuParentLeft > menuWidth) {
            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)){
              $u.css({right:0,left:'auto'});
            }
            else {
              $u.css({right:menuParentWidth + 'px',left:'auto'});
            }
          }
        }
        var windowHeight = $w.height(),
        offsetTop = $u.offset().top,
        menuParentShadow = ($mul.hasClass('sf-shadow') && $u.css('padding-bottom').length > 0) ? parseInt($u.css('padding-bottom').slice(0,-2)) : 0,
        menuParentHeight = ($mul.hasClass('sf-vertical')) ? '-' + menuParentShadow : $u.parent().outerHeight(true) - menuParentShadow,
        menuHeight = $u.height(),
        baseline = windowHeight + _offset('y');
        var expandUp = ((offsetTop + menuHeight > baseline) && (offsetTop > menuHeight));
        if (expandUp) {
          $u.css({bottom:menuParentHeight + 'px',top:'auto'});
        }
        $u.css('display','none');
      });
    };

    return this.each(function() {
      var o = $.fn.superfish.o[this.serial]; /* get this menu's options */

      /* if callbacks already set, store them */
      var _onBeforeShow = o.onBeforeShow,
      _onHide = o.onHide;

      $.extend($.fn.superfish.o[this.serial],{
        onBeforeShow: function() {
          onBeforeShow.call(this); /* fire our Supposition callback */
          _onBeforeShow.call(this); /* fire stored callbacks */
        },
        onHide: function() {
          onHide.call(this); /* fire our Supposition callback */
          _onHide.call(this); /* fire stored callbacks */
        }
      });
    });
  };
})(jQuery);;
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
/*
 * This is not the original jQuery Superfish plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.superfish = function(op){
    var sf = $.fn.superfish,
      c = sf.c,
      $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
      over = function(){
        var $$ = $(this), menu = getMenu($$);
        clearTimeout(menu.sfTimer);
        $$.showSuperfishUl().siblings().hideSuperfishUl();
      },
      out = function(){
        var $$ = $(this), menu = getMenu($$), o = sf.op;
        clearTimeout(menu.sfTimer);
        menu.sfTimer=setTimeout(function(){
          if ($$.children('.sf-clicked').length == 0){
            o.retainPath=($.inArray($$[0],o.$path)>-1);
            $$.hideSuperfishUl();
            if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
          }
        },o.delay);
      },
      getMenu = function($menu){
        var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
        sf.op = sf.o[menu.serial];
        return menu;
      },
      addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

    return this.each(function() {
      var s = this.serial = sf.o.length;
      var o = $.extend({},sf.defaults,op);
      o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels),
      p = o.$path;
      for (var l = 0; l < p.length; l++){
        p.eq(l).addClass([o.hoverClass,c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass);
      }
      sf.o[s] = sf.op = o;

      $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
        if (o.autoArrows) addArrow( $(this).children('a:first-child, span.nolink:first-child') );
      })
      .not('.'+c.bcClass)
        .hideSuperfishUl();

      var $a = $('a, span.nolink',this);
      $a.each(function(i){
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
      });
      o.onInit.call(this);

    }).each(function() {
      var menuClasses = [c.menuClass],
      addShadow = true;
      if ($.browser !== undefined){
        if ($.browser.msie && $.browser.version < 7){
          addShadow = false;
        }
      }
      if (sf.op.dropShadows && addShadow){
        menuClasses.push(c.shadowClass);
      }
      $(this).addClass(menuClasses.join(' '));
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};
  sf.IE7fix = function(){
    var o = sf.op;
    if ($.browser !== undefined){
      if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined) {
        this.toggleClass(sf.c.shadowClass+'-off');
      }
    }
  };
  sf.c = {
    bcClass: 'sf-breadcrumb',
    menuClass: 'sf-js-enabled',
    anchorClass: 'sf-with-ul',
    arrowClass: 'sf-sub-indicator',
    shadowClass: 'sf-shadow'
  };
  sf.defaults = {
    hoverClass: 'sfHover',
    pathClass: 'overideThisToUse',
    pathLevels: 1,
    delay: 800,
    animation: {opacity:'show'},
    speed: 'fast',
    autoArrows: true,
    dropShadows: true,
    disableHI: false, // true disables hoverIntent detection
    onInit: function(){}, // callback functions
    onBeforeShow: function(){},
    onShow: function(){},
    onHide: function(){}
  };
  $.fn.extend({
    hideSuperfishUl : function(){
      var o = sf.op,
        not = (o.retainPath===true) ? o.$path : '';
      o.retainPath = false;
      var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
          .children('ul').addClass('sf-hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl : function(){
      var o = sf.op,
        sh = sf.c.shadowClass+'-off',
        $ul = this.addClass(o.hoverClass)
          .children('ul.sf-hidden').hide().removeClass('sf-hidden');
      sf.IE7fix.call($ul);
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
      return this;
    }
  });
})(jQuery);;
/*
 * Supersubs v0.4b - jQuery plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */
/*
 * This is not the original jQuery Supersubs plugin.
 * Please refer to the README for more information.
 */

(function($){ // $ will refer to jQuery within this closure
  $.fn.supersubs = function(options){
    var opts = $.extend({}, $.fn.supersubs.defaults, options);
    // return original object to support chaining
    // Although this is unnecessary due to the way the module uses these plugins.
    for (var a = 0; a < this.length; a++) {
      // cache selections
      var $$ = $(this).eq(a),
      // support metadata
      o = $.meta ? $.extend({}, opts, $$.data()) : opts;
      // Jump one level if it's a "NavBar"
      if ($$.hasClass('sf-navbar')) {
        $$ = $$.children('li').children('ul');
      }
      // cache all ul elements
      var $ULs = $$.find('ul'),
      // get the font size of menu.
      // .css('fontSize') returns various results cross-browser, so measure an em dash instead
      fontsize = $('<li id="menu-fontsize">&#8212;</li>'),
      size = fontsize.attr('style','padding:0;position:absolute;top:-99999em;width:auto;')
      .appendTo($$)[0].clientWidth; //clientWidth is faster than width()
      // remove em dash
      fontsize.remove();

      // loop through each ul in menu
      for (var b = 0; b < $ULs.length; b++) {
        var
        // cache this ul
        $ul = $ULs.eq(b);
        // If a multi-column sub-menu, and only if correctly configured.
        if (o.megamenu && $ul.hasClass('sf-megamenu') && $ul.find('.sf-megamenu-column').length > 0){
          // Look through each column.
          var $column = $ul.find('div.sf-megamenu-column > ol'),
          // Overall width.
          mwWidth = 0;
          for (var d = 0; d < $column.length; d++){
            resize($column.eq(d));
            // New column width, in pixels.
            var colWidth = $column.width();
            // Just a trick to convert em unit to px.
            $column.css({width:colWidth})
            // Making column parents the same size.
            .parents('.sf-megamenu-column').css({width:colWidth});
            // Overall width.
            mwWidth += parseInt(colWidth);
          }
          // Resizing the columns container too.
          $ul.add($ul.find('li.sf-megamenu-wrapper, li.sf-megamenu-wrapper > ol')).css({width:mwWidth});
        }
        else {
          resize($ul);
        }
      }
    }
    function resize($ul){
      var
      // get all (li) children of this ul
      $LIs = $ul.children(),
      // get all anchor grand-children
      $As = $LIs.children('a');
      // force content to one line and save current float property
      $LIs.css('white-space','nowrap');
      // remove width restrictions and floats so elements remain vertically stacked
      $ul.add($LIs).add($As).css({float:'none',width:'auto'});
      // this ul will now be shrink-wrapped to longest li due to position:absolute
      // so save its width as ems.
      var emWidth = $ul.get(0).clientWidth / size;
      // add more width to ensure lines don't turn over at certain sizes in various browsers
      emWidth += o.extraWidth;
      // restrict to at least minWidth and at most maxWidth
      if (emWidth > o.maxWidth) {emWidth = o.maxWidth;}
      else if (emWidth < o.minWidth) {emWidth = o.minWidth;}
      emWidth += 'em';
      // set ul to width in ems
      $ul.css({width:emWidth});
      // restore li floats to avoid IE bugs
      // set li width to full width of this ul
      // revert white-space to normal
      $LIs.add($As).css({float:'',width:'',whiteSpace:''});
      // update offset position of descendant ul to reflect new width of parent.
      // set it to 100% in case it isn't already set to this in the CSS
      for (var c = 0; c < $LIs.length; c++) {
        var $childUl = $LIs.eq(c).children('ul');
        var offsetDirection = $childUl.css('left') !== undefined ? 'left' : 'right';
        $childUl.css(offsetDirection,'100%');
      }
    }
    return this;
  };
  // expose defaults
  $.fn.supersubs.defaults = {
    megamenu: true, // define width for multi-column sub-menus and their columns.
    minWidth: 12, // requires em unit.
    maxWidth: 27, // requires em unit.
    extraWidth: 1 // extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
  };
})(jQuery); // plugin code ends
;
/**
 * @file
 * The Superfish Drupal Behavior to apply the Superfish jQuery plugin to lists.
 */

(function ($) {
  Drupal.behaviors.superfish = {
    attach: function (context, settings) {
      // Take a look at each list to apply Superfish to.
      $.each(settings.superfish || {}, function(index, options) {
        // Process all Superfish lists.
        $('#superfish-' + options.id, context).once('superfish', function() {
          var list = $(this);

          // Check if we are to apply the Supersubs plug-in to it.
          if (options.plugins || false) {
            if (options.plugins.supersubs || false) {
              list.supersubs(options.plugins.supersubs);
            }
          }

          // Apply Superfish to the list.
          list.superfish(options.sf);

          // Check if we are to apply any other plug-in to it.
          if (options.plugins || false) {
            if (options.plugins.touchscreen || false) {
              list.sftouchscreen(options.plugins.touchscreen);
            }
            if (options.plugins.smallscreen || false) {
              list.sfsmallscreen(options.plugins.smallscreen);
            }
            if (options.plugins.supposition || false) {
              list.supposition();
            }
            if (options.plugins.bgiframe || false) {
              list.find('ul').bgIframe({opacity:false});
            }
          }
        });
      });
    }
  };
})(jQuery);;
