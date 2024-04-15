var site = site || {};
site.Utilities = (function() {
    // Functions

    // var functionName = function() {
    //
    // };

    //------------------------------------------------------------------------//
    //  BACKGROUND IMAGES
    //------------------------------------------------------------------------//
    var backgroundImageElement = function(mediaQueries) {
        var bgImageContainer = $('.js-bg-image');
        bgImageContainer.css('background-image', function() {
            if (mediaQueries.md.matches) {
                var bgUrlEncode = encodeURI($(this).data("bg-img-lg"));
            } else {
                var bgUrlEncode = encodeURI($(this).data("bg-img-sm"));
            }
            var bg = 'url("' + bgUrlEncode + '")';
            return bg;
        });
    }

    var acceptCookieConsent = function($) {
        var cookieConsent = getCookie("cookieConsent");
        if (cookieConsent !== "accepted") {
            $('.js-cookie-consent').show();
            $('.js-accept-cookie-consent').on('click', function(e) {
                e.preventDefault();
                $('.js-cookie-consent').hide();
                document.cookie = "cookieConsent=accepted; path=/";
            })
        }

        //function getCookie        
        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        }
    }

    // Return
    return {
        // functionName : functionName
        backgroundImageElement: backgroundImageElement,
        acceptCookieConsent: acceptCookieConsent,
    };
}());