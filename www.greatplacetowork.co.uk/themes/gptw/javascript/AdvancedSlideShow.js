function setActiveBG(posID) {
    'use strict';
    jQuery('.advancedSlideShowIndicators a').removeClass('active');
    jQuery('#SlideID-' + posID).addClass('active');
}

jQuery(document).ready(function () {
    'use strict';
    jQuery('#mainSlider').carousel({
        interval: 7000,
        pause: false
    });

    jQuery('a[data-slide="prev"].slideshow').click(function (e) {
        e.preventDefault();
        jQuery('#mainSlider').carousel('prev');
    });

    jQuery('a[data-slide="next"].slideshow').click(function (e) {
        e.preventDefault();
        jQuery('#mainSlider').carousel('next');
    });

    jQuery('#mainSlider').on('slide.bs.carousel', function (e) {
        // var active = jQuery(e.target).find('.carousel-inner > .item.active');
        // var from = active.index();
        var next = jQuery(e.relatedTarget);
        var to = next.index();
        // console.log(to + ' - ' + from);
        if (parseInt(to) === 0) {
            setActiveBG(0);
            // console.log('Start Index! - ' + active.index());
        } else {
            setActiveBG(next.index());
            // console.log('active Index: ' + active.index() + ' - next index: ' + next.index());
        }
    });
});