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

var TRANSITIONS = {
    fade : "fade",
    slide : "slide",
    verticalSlide: "vertical_slide"
};

function Arena(options) {

var totalImages = _setValue(options.totalImages, 1),
    imgPrefix = _setValue(options.imgPrefix, 'no_default', "Images Prefix: a prefix must be set."),
    imgFormat = _setValue(options.imgFormat, '.jpg'),
    imgPath = _setValue(options.imgPath, 'sliderImages'),
    infiniteScroll = _setValue(options.infiniteScroll, true),
    transition = _setValue(options.transition, TRANSITIONS.fade),
    debug = _setValue(options.debug, false);



}
