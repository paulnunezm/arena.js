
//=====================
// Constants
//=====================

// Transitions supported
var TRANSITIONS = {
        fade : "fade",
        slide : "slide"
        // verticalSlide: "vertical_slide"
    },
    SELECTORS = {
        item : "#arena_item_",
        bullet : "#arena_bullet_",
        caption: "arena_caption"
    };

var slideState = 1, // Current slide
    slideStateHandler = {
        increment: function () {
            slideState++;
        },
        decrement : function () {
            slideState--;
        },
        set: function (to) {
            slideState = to;
        }
    },
    ARROW_ID ={
        left: "arena_left_arrow",
        right: "arena_right_arrow"
    },
    ARROWS = {
        left: null,
        right: null,
        initialize: function () {
            this.left =  $("#"+ARROW_ID.left);
            this.right =$("#"+ARROW_ID.right);
        }
    };

/**
 * Changes the current bullet position.
 * @param number of the bullet to change to
 * @private
 */
function _changeBulletPosition(number) {
    $("#arena_bullets li").removeClass('active');
    $(SELECTORS.bullet+number).addClass('active');
}

/**
 * Sets a HTML element display block or none.
 *
 * @param $element A jQuery element to handle
 * @param value true (block) or false (none)
 * @private
 */
function _elementDisplay($element, value) {
    var display = (value) ? "block" : "none";
    $element.css("display", display);
}

/**
 * Checks if a value is undefined and if it is
 * sets a default value for it. If is defined just
 * returns the current value.
 *
 * @param a variable to check
 * @param defaultValue to return
 * @param errorMessage message to show if the variable
 * needs to be declared.
 * @returns value
 * @private
 */
function _setValue(a, defaultValue, errorMessage) {
    var b = (typeof a !== 'undefined') ?  a : defaultValue;

    if(defaultValue == "no_default" && b == defaultValue) {
        console.error(errorMessage);
        return false;
    }

    return b;
}


/**
 * Initializes Arena slider adding the items to the DOM
 * and preparing them by transition effect.
 * @param options
 */
function init(options) {

    $("#arena").append( '  ' +
        ' <ul id="arena_ul" class="items"></ul>  '  +
        '     <!— Navigations —>  '  +
        '     <div id="arena_left_arrow"></div>  '  +
        '     <div id="arena_right_arrow"></div>  '  +
        '     <ul id="arena_bullets"></ul>  '  +
        '    <!— /Navigations —>  ' +
    '');

    // inject HTML elements
    var sliderUl = $("#arena_ul"),
        bullets = $("#arena_bullets");

    var items_cssRules = null;

    for(var item = 1; item <= options.totalImages; item++){

        var liTag = document.createElement("li"),
            textDiv = document.createElement('div'),
            bulletLiTag = document.createElement("li");

        liTag.setAttribute("id",SELECTORS.item.replace("#","")+item);
        textDiv.setAttribute("class", SELECTORS.caption);
        bulletLiTag.setAttribute("id",SELECTORS.bullet.replace("#","")+item);

        // Appending child's
        liTag.append(textDiv);
        sliderUl.append(liTag);

        $(SELECTORS.item+item).css("background",
            "url("+
            options.imgPath +
            options.imgPrefix +
            item +
            options.imgFormat +
            ") center top/cover");

        bullets.append(bulletLiTag);

        // set initial positions per transition
        var item_1_cssRules;

        if(items_cssRules == null){
            switch (options.transition){
                case TRANSITIONS.slide:
                    item_1_cssRules = {left:0};
                    // // items_cssRules  = {left: "100%"};
                    items_cssRules = item_1_cssRules;
                    break;
                case TRANSITIONS.verticalSlide:
                    item_1_cssRules = {left:"0", top:"0"};
                    items_cssRules  = {left:"0", top:"-100%"};
                    break;
                case TRANSITIONS.fade:
                    item_1_cssRules = {left:"0",opacity:"1"};
                    items_cssRules  = {left:"0",opacity:"0"};
                    break;
            }
        }

        if(item == 1){
            $(SELECTORS.item+"1").css(item_1_cssRules);

            if(options.transition == TRANSITIONS.slide){
                TweenMax.set($(SELECTORS.item+"1"),{x:0});
            }
        }else{
            $(SELECTORS.item+item).css(items_cssRules);
            if(options.transition == TRANSITIONS.slide){
                TweenMax.set( $(SELECTORS.item+item),{x:"100%"});
            }
        }

        //set captions
        if(options.captions.length >= 1){
            if(options.captions[item-1] != null);
            $(SELECTORS.item+item+" ."+SELECTORS.caption).html(options.captions[item-1]);
        }

    }

    $(SELECTORS.bullet+"1").addClass("active");

    if(!options.infiniteScroll) $("#slider_leftButton").css("display","none");
}

/**
 * Handles the slides transitions while delegating the
 * animations to any Class that override the
 * animation methods.
 * <p>
*     AnimationCallback must implement two methods:
 *     .leftAnimation and .rightAnimation
 *    each method must handle the animation of both the current and previous slides.
 *
 * @param totalImages
 * @param animationCallback
 * @constructor
 */
function TransitionBaseHandler(totalImages, animationCallback) {

    this.left = function () {
        slideStateHandler.decrement();

        if(slideState == 0) slideStateHandler.set(totalImages);

        _elementDisplay(ARROWS.right, true);
        _changeBulletPosition(slideState);
        animationCallback.leftAnimation($(SELECTORS.item+slideState), $(SELECTORS.item+(slideState+1)));
    };

    this.right = function () {
        var $currentSlide, $nextSlide;
        slideStateHandler.increment();

        if(slideState > totalImages){
            slideStateHandler.set(1);
            $currentSlide = $(SELECTORS.item+totalImages);
            $nextSlide = $(SELECTORS.item+slideState);
        }else{
           $currentSlide = $(SELECTORS.item+(slideState-1));
           $nextSlide = $(SELECTORS.item+slideState);
        }

        animationCallback.rightAnimation($currentSlide, $nextSlide);
        _changeBulletPosition(slideState);
    };
}

/**
 * A fade transition implementation.
 * @param totalImages
 * @constructor
 */
function FadeTransition(totalImages) {

    var callback = {};
    callback.leftAnimation = function ($current, $next) {
        $next.animate({opacity:"0"},800,'linear');
        $current.animate({opacity:"1"},800,'linear');
    };

    callback.rightAnimation = function ($current, $next) {
        $current.animate({opacity:"0"},800,'linear');
        $next.animate({opacity:"1"},800,'linear');
    };

    var transitionHandler = new TransitionBaseHandler(totalImages, callback);

    this.left = transitionHandler.left;
    this.right = transitionHandler.right;
}

/**
 * A slide transition implementation.
 * @param totalImages
 * @constructor
 */
function SlideTransition(totalImages) {
    var callback = {};
    callback.leftAnimation = function ($next, $current) {
        TweenMax.set($next,{x:"-100%"});
        TweenMax.to($next, 0.5, {x: "0%", ease:Power0.easeNone });
        TweenMax.to($current, 0.5, {x: "100%", ease:Power0.easeNone });
    };

    callback.rightAnimation = function ($current, $next) {
        console.log(slideState);
        TweenMax.set($next,{x:"100%"});
        TweenMax.to($next, 0.5, {x: "0%", ease:Power0.easeNone });
        TweenMax.to($current, 0.5, {x: "-100%", ease:Power0.easeNone });
    };

    var transitionHandler = new TransitionBaseHandler(totalImages, callback);

    this.left = transitionHandler.left;
    this.right = transitionHandler.right;
}

/**
 * This method provides the correct transition handler for each transition
 * type.
 * @param type transition type
 * @constructor
 */
function TransitionFactory(type, totalImages) {

    if(type == TRANSITIONS.fade){
        return new FadeTransition(totalImages);
    }else if (type == TRANSITIONS.slide) {
        return new SlideTransition(totalImages);
    }else{
        console.error("This transition is not yet supported");
    }
}

function setTranstiton(transitionType, totalImages) {
   return new TransitionFactory(transitionType, totalImages);
}


function Arena(options) {

    var mOptions = {};
    mOptions.totalImages = _setValue(options.totalImages, 1);
    mOptions.imgPrefix = _setValue(options.imgPrefix, 'no_default', "Images Prefix: a prefix must be set.");
    mOptions.imgFormat = _setValue(options.imgFormat, '.jpg');
    mOptions.imgPath = _setValue(options.imgPath, 'sliderImages');
    mOptions.infiniteScroll = _setValue(options.infiniteScroll, true);
    mOptions.autoScroll = _setValue(options.autoScroll, true);
    mOptions.transition = _setValue(options.transition, TRANSITIONS.fade);
    mOptions.captions = _setValue(options.captions, []);
    mOptions.debug = _setValue(options.debug, false);

    init(mOptions);
    var transition = setTranstiton(mOptions.transition, options.totalImages);

    // set listeners
    ARROWS.initialize();
    ARROWS.left.on("click touchstart'", transition.left);
    ARROWS.right.on("click touchstart'", transition.right);

}
