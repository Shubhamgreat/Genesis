$(function() {
    //------------------------------------------------------------------------//
    // GLOBAL VARIABLES
    //------------------------------------------------------------------------//

    //  from site.Navigation.pageNav
    let itemWidths = [];

    // Bootstrap matching Media Queries
    //To use:
    //      Pass mediaQueries into module function: extranet.Utilities.function(mediaQueries)
    //      In module function:
    //          if(mediaQueries.sm.matches){
    //              code here
    //          }
    var mediaQueries = {
        sm: window.matchMedia('(min-width: 576px)'),
        mdDown: window.matchMedia('(max-width: 767px'),
        md: window.matchMedia('(min-width: 768px)'),
        lgDown: window.matchMedia('(max-width: 991px)'),
        lg: window.matchMedia('(min-width: 992px)'),
        xl: window.matchMedia('(min-width: 1200px)')
    }

    //------------------------------------------------------------------------//
    //  Initialize Lazyloading with support for native lazyload
    //
    //  Defaults to use lazyload plugin, but will fall back to native support 
    //  for browsers with support for the loading="lazy" attribute
    //  (https://caniuse.com/#feat=loading-lazy-attr)
    //------------------------------------------------------------------------//
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy",
        use_native: true
    });
    //------------------------------------------------------------------------//
    //  PUBLIC MODULE FUNCTIONS
    //------------------------------------------------------------------------//
    //  Usage Examples: 
    //      site.Utilities.functionName()
    //      site.Utilities.functionName(mediaQueries)
    //------------------------------------------------------------------------//
    site.FindaDoctor.wizard();
    site.Navigation.mainNav(mediaQueries);
    site.Navigation.childNavPosition(mediaQueries);
    site.Navigation.stickyNav(mediaQueries);
    site.Utilities.acceptCookieConsent($);
    site.Utilities.backgroundImageElement(mediaQueries);
    site.Navigation.tabButtonNav(mediaQueries);
    site.Navigation.collapseNav(mediaQueries);
    site.Navigation.pageNav(mediaQueries, itemWidths);
    site.Carousels.initTestimonialSlider(mediaQueries);


    // Check DOM for images loaded via dynamically and update Lazyload instance
    if (lazyLoadInstance) {
        lazyLoadInstance.update();
    }


    //------------------------------------------------------------------------//
    // WINDOW RESIZE FUNCTIONS
    //------------------------------------------------------------------------//
    $(window).smartresize(function() {
        //------------------------------------------------------------------------//
        //  Public module functions
        //------------------------------------------------------------------------//
        //  Usage Examples: 
        //      site.Utilities.functionName()
        //      site.Utilities.functionName(mediaQueries)
        //------------------------------------------------------------------------//
        site.Navigation.mainNav(mediaQueries);
        site.Navigation.childNavPosition(mediaQueries);
        site.Navigation.stickyNav(mediaQueries);
        site.Utilities.backgroundImageElement(mediaQueries);
        site.Navigation.tabButtonNav(mediaQueries);
        site.Navigation.collapseNav(mediaQueries);
        site.Navigation.pageNav(mediaQueries, itemWidths);
        site.Carousels.initTestimonialSlider(mediaQueries);
    }, 125);
});