var site = site || {};
site.Carousels = (function() {

    var initTestimonialSlider = function(mediaQueries) {

        var sidebar = $('.js-sidebar');
        var sidebarWidth = sidebar.width();
        var sidebarBreakpoint = 400;
        var testimonialSlider = $('.js-testimonial-slider');

        // Account for widget being in a sidebar
        if (sidebar.length > 0 && testimonialSlider.length > 0) {
            if (sidebarWidth < sidebarBreakpoint) {
                $('.js-sidebar .js-testimonial-slider').slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    touchMove: false,
                    swipe: false,
                    arrows: true,
                    prevArrow: '<div class="slick-prev"><i class="slick-arrow-icon far fa-chevron-left" role="button"></i></div>',
                    nextArrow: '<div class="slick-next"><i class="slick-arrow-icon far fa-chevron-right" role="button"></i></div>',
                });
                $('.js-testimonial-slider:not(.js-sidebar .js-testimonial-slider)').slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: true,
                    touchMove: false,
                    swipe: false,
                    arrows: true,
                    prevArrow: '<div class="slick-prev"><i class="slick-arrow-icon far fa-chevron-left" role="button"></i></div>',
                    nextArrow: '<div class="slick-next"><i class="slick-arrow-icon far fa-chevron-right" role="button"></i></div>',
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    }],
                });
            } else {
                $('.js-testimonial-slider').slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: true,
                    touchMove: false,
                    swipe: false,
                    arrows: true,
                    prevArrow: '<div class="slick-prev"><i class="slick-arrow-icon far fa-chevron-left" role="button"></i></div>',
                    nextArrow: '<div class="slick-next"><i class="slick-arrow-icon far fa-chevron-right" role="button"></i></div>',
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    }],
                });
            }
        } else {
            if (testimonialSlider) {
                $('.js-testimonial-slider').slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: true,
                    touchMove: false,
                    swipe: false,
                    arrows: true,
                    prevArrow: '<div class="slick-prev"><i class="slick-arrow-icon far fa-chevron-left" role="button"></i></div>',
                    nextArrow: '<div class="slick-next"><i class="slick-arrow-icon far fa-chevron-right" role="button"></i></div>',
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    }],
                });
            }
        }


        if (testimonialSlider) {
            if (mediaQueries.lg.matches) {

                findCenterSlide();
                var slideArrows = Array.prototype.slice.call(document.querySelectorAll('.slick-arrow'));
                slideArrows.forEach(function(arrow) {
                    arrow.addEventListener('click', function() {
                        findCenterSlide();
                    });
                });

                function findCenterSlide() {
                    var activeSlides = Array.prototype.slice.call(document.querySelectorAll('.slick-active'));
                    if (activeSlides) {
                        activeSlides.forEach(function(slide, index) {
                            if (index == 1) {
                                slide.classList.add('slick-center')
                            }
                        })
                    }
                }
            }
        }
    }

    return {
        initTestimonialSlider: initTestimonialSlider,
    }

}());