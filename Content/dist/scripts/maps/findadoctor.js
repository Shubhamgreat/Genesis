var site = site || {};
site.FindaDoctor = (function() {
    var wizard = function() {
        $(".js-backBtn").on("click", function() {
            $(".js-find-step1").removeClass('d-none');
            $(".js-find-step2").addClass('d-none');
            $(".js-medicaidResults").addClass('d-none');
            $(".js-togetherResults").addClass("d-none");
            $(".js-care4kidsResults").addClass("d-none");
            $(".js-backBtnSection").addClass('d-none');
        });
        $(".js-getStarted").on("click", function() {
            $(".js-find-step1").addClass("d-none");
            $(".js-find-step2").removeClass("d-none");
            $(".js-backBtnSection").removeClass("d-none")
        });
        $(".js-medicaidBtn").on("click", function() {
            $(".js-find-step2").addClass("d-none");
            $(".js-medicaidResults").removeClass("d-none");
        });

        $(".js-togetherBtn").on("click", function() {
            $(".js-find-step2").addClass("d-none");
            $(".js-togetherResults").removeClass("d-none");
        });

        $(".js-care4kidsBtn").on("click", function() {
            $(".js-find-step2").addClass("d-none");
            $(".js-care4kidsResults").removeClass("d-none");
        });
    }

    return {
        wizard: wizard,
    }
}());