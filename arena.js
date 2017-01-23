
//=====================
// Constants
//=====================

// Transition supported
var TRANSITIONS = {
        fade : "fade",
        slide : "slide",
        verticalSlide: "vertical_slide"
    },
    SELECTORS = {
        item : "#arena_item_",
        bullet : "#arena_bullet_"
    };


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

    if(defaultValue == "no_default") {
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
    // inject HTML elements
    var sliderUl = $("#arena_ul"),
        bullets = $("#arena_bullets");

    // ****  Injecting Child Elements ****
    var sliderUl = $("#arena_ul"),
        bullets = $("#arena_bullets");

    var items_cssRules = null;

    for(var item = 1; item <= options.totalImages; item++){

        var liTag = document.createElement("li"),
            bulletLiTag = document.createElement("li");


        liTag.setAttribute("id",SELECTORS.item+item);
        bulletLiTag.setAttribute("id",SELECTORS.bullet+item);

        // Appending child's
        sliderUl.append(liTag);
        $(SELECTORS.item+item).css("background","url("+
            options.imgPath +
            options.prefix +
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
                    items_cssRules  = {left: "100%"};
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
        }

        $(SELECTORS.item+item).css(items_cssRules);


    }

    $(SELECTORS.bullet+"1").addClass("active");

    if(!sliderInfinite)
        $("#slider_leftButton").css("display","none");
}



function Arena(options) {

var mOptions;
    mOptions.totalImages = _setValue(options.totalImages, 1);
    mOptions.imgPrefix = _setValue(options.imgPrefix, 'no_default', "Images Prefix: a prefix must be set.");
    mOptions.imgFormat = _setValue(options.imgFormat, '.jpg');
    mOptions.imgPath = _setValue(options.imgPath, 'sliderImages');
    mOptions.infiniteScroll = _setValue(options.infiniteScroll, true);
    mOptions.transition = _setValue(options.transition, TRANSITIONS.fade);
    mOptions.debug = _setValue(options.debug, false);

    init(mOptions);
}
