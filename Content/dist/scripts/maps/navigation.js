var site = site || {};
site.Navigation = (function() {

    var mainNav = function(mediaQueries) {

        // MOBILE FUNCTIONALITY 
        if (!mediaQueries.xl.matches) {
            // Open/Close Secondary Nav
            $('.js-child-nav-toggle').on("click", function() {
                let secondaryNavToggle = $(this);
                let secondaryNavIcon = secondaryNavToggle.find('.js-mobile-nav-icon');
                secondaryNavToggle.toggleClass('open').next('.js-child-nav').toggleClass('show');
                secondaryNavIcon.toggleClass('d-none');
            });
            // Open/Close Tertiary Nav
            $('.js-child-subnav-toggle').on("click", function() {
                let tertiaryNavToggle = $(this);
                let tertiaryNavIcon = tertiaryNavToggle.find('.js-mobile-nav-icon');
                tertiaryNavToggle.toggleClass('open').next('.js-child-subnav').toggleClass('show');
                tertiaryNavIcon.toggleClass('d-none');
            });
        }

        // DESKTOP-ONLY FUNCTIONALITY
        else {
            // Open & Close Child Nav
            $('.js-main-nav-item').click(function(e) {
                let navItem = $(this);
                // close other child navs 
                if (!navItem.hasClass('show-children')) {
                    $('.js-main-nav-item').removeClass('show-children')
                }
                // toggle state of child nav when primary nav item clicked
                if (navItem.find('.child-nav')) {
                    navItem.toggleClass('show-children')
                }
            });

            // Close all child navs when anywhere but child nav is clicked
            $('body').click(function(event) {
                let navItems = $('.js-main-nav-item');

                if (!$(event.target).closest('.main-nav-item ').length) {
                    navItems.removeClass('show-children');
                }
            });
        }
    }

    // Adjust mega menu position if it runs offscreen
    var childNavPosition = function(mediaQueries) {
        if (mediaQueries.xl.matches) {
            var childNav = Array.prototype.slice.call(document.querySelectorAll('.js-child-nav'));
            childNav.forEach(function(nav) {
                let currentNavBounding = nav.getBoundingClientRect();
                let boundingRight = currentNavBounding.right;
                let windowWidth = document.documentElement.clientWidth;
                let difference = (boundingRight - windowWidth) + 16;

                if (boundingRight > windowWidth) {
                    nav.style.left = "-" + difference + 'px'
                }
            })
        }
    }


    var stickyNav = function(mediaQueries) {
        // if (mediaQueries.xl.matches) {
        var utilityNavHeight = document.querySelector('.utility-nav').offsetHeight + 1

        var stickyHeader = document.querySelector('header')
        stickyHeader.style.top = "-" + utilityNavHeight + 'px';

        document.addEventListener('scroll', function() {
            window.requestAnimationFrame(function() {
                if (window.scrollY >= utilityNavHeight) {
                    document.querySelector('.js-main-nav').classList.add('stuck')
                } else {
                    document.querySelector('.js-main-nav').classList.remove('stuck')
                }
            })
        });
        // }
    }


    var tabButtonNav = function() {
        var tabButtons = Array.prototype.slice.call(document.querySelectorAll('.js-tab-button'));
        if (tabButtons) {
            tabButtons.forEach(function(nav) {
                nav.onclick = function() {
                    var targetPlan = nav.dataset.planTarget;
                    var targetPlanValues = Array.prototype.slice.call(document.querySelectorAll('[data-plan-tier="' + targetPlan + '"]'));
                    var planValues = Array.prototype.slice.call(document.querySelectorAll('.js-plan-tier-value'));

                    // Update active state and swap values with selected plan's
                    if (!nav.classList.contains('active')) {
                        tabButtons.forEach(function(btn) {
                            btn.classList.remove('active')
                        })
                        nav.classList.add('active');
                        // Hide all Plan Values
                        planValues.forEach(function(value) {
                            if (!value.classList.contains('d-none')) {
                                value.classList.add('d-none');
                                if (!value.classList.contains('d-lg-block')) {
                                    value.classList.add('d-lg-block');
                                }
                            }
                        });
                        // Show selected plan values
                        targetPlanValues.forEach(function(targetValue) {
                            targetValue.classList.remove('d-none')
                        })
                    }
                }
            })

        }
    }

    var collapseNav = function(mediaQueries) {
        var navToggle = document.querySelector('.js-collapse-nav-toggle');
        var navItems = document.querySelector('.js-collapse-nav-items');
        // Toggle nav state icon
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                var toggleIcon = Array.prototype.slice.call(document.querySelectorAll('svg.js-dropdown-icon'));
                toggleIcon.forEach(function(icon) {
                    icon.classList.toggle('d-none')
                })

            })
            // Always show nav items on large viewports
            if (mediaQueries.lg.matches) {
                if (!navItems.classList.contains('show')) {
                    navItems.classList.add('show');
                }
            } else {
                if (navItems.classList.contains('show')) {
                    var iconOpened = document.querySelector('.fa-chevron-up');
                    var iconClosed = document.querySelector('.fa-chevron-down');
                    navItems.classList.remove('show');
                    iconOpened.classList.add('d-none');
                    iconClosed.classList.remove('d-none');
                }
            }
        }
    }


    var pageNav = function(mediaQueries, itemWidths) {
        // Mobile
        if (mediaQueries.mdDown.matches) {
            let mobileNavContainer = document.querySelector('.js-page-nav-mobile');
            let mobileNavToggle = document.querySelector('.js-more-toggle-mobile');
            let mobileNavItems = document.querySelector('.js-page-nav-mobile-items');
            let pageNavItems = Array.prototype.slice.call(document.querySelectorAll('.js-page-nav-item'));

            if (mobileNavContainer) {
                let mobileNavItemCount = mobileNavItems.childElementCount;

                pageNavItems.forEach(function(item) {
                    let itemId = item.dataset.navItem;
                    if (itemId <= 3) {
                        item.classList.remove('d-none');
                    }
                })

                // If collpasible mobile nav has any nav items, show the mobile `see more` nav


                if (mobileNavItemCount > 0) {
                    mobileNavContainer.classList.remove('d-none');
                }
                // handle nav toggle clicks
                mobileNavToggle.addEventListener('click', function() {
                    let closedText = "See More";
                    let openedText = "See Less";
                    // wait for nav animation to end and change toggle button text
                    setTimeout(function() {
                        if (mobileNavToggle.classList.contains('collapsed')) {
                            mobileNavToggle.text = closedText;
                        } else {
                            mobileNavToggle.text = openedText;
                        }
                    }, 250)
                })
            }
        }
        // Desktop
        if (mediaQueries.md.matches) {
            let pageNavWrapper = document.querySelector('.js-page-nav');
            if (pageNavWrapper) {
                let visibleItemsWidth = 0;
                let brokenOn = "";
                let containerWidth = document.querySelector('.js-page-nav').offsetWidth;
                let navItems = Array.prototype.slice.call(document.querySelectorAll('.js-page-nav-item'));
                let dropdownNavItems = Array.prototype.slice.call(document.querySelectorAll('.js-page-nav-dropdown-item'));
                let seeMoreButton = document.querySelector('.js-more-toggle');
                let itemWidthsCount = itemWidths.length;

                // If itemWidths array is empty, add each nav item width to it
                if (itemWidths.length == 0) {
                    navItems.forEach(function(navItem) {
                        let itemWidth = navItem.offsetWidth;
                        itemWidths.push(itemWidth);
                    });
                }
                // Iterate through array
                for (let index = 0; index < itemWidths.length; index++) {
                    const itemWidth = itemWidths[index];
                    // Get new total width after adding this item's width
                    let newTotalWidth = visibleItemsWidth + itemWidth;
                    // If adding this item makes nav items bigger than container
                    if (newTotalWidth + 100 >= containerWidth) { // 100 represents space for "see more" button
                        brokenOn = index;
                        // Show/Hide items in main nav and dropdown
                        navItems.forEach(function(item) {
                            let navItemId = item.dataset.navItem;
                            // Hide all items from breaking position to last
                            if (navItemId >= brokenOn) {
                                item.classList.remove('d-md-block');
                            } else {
                                item.classList.add('d-md-block');
                            }
                        });
                        // Show nav items in dropdown nav
                        dropdownNavItems.forEach(function(dropdownItem) {
                            let dropdownItemId = dropdownItem.dataset.dropdownNavItem;
                            if (dropdownItemId >= brokenOn) {
                                dropdownItem.classList.remove('d-none');
                            } else {
                                dropdownItem.classList.add('d-none');
                            }
                        })
                        // Display `See More` button (but only on `lg` viewports!)
                        seeMoreButton.classList.add('d-md-block');
                        //  Reset visibleItemsWidth to 0 to get accurate math if 
                        //  viewport size changes
                        visibleItemsWidth = 0;
                        // Stop iterating through items
                        return;
                    }
                    // If all items so far fit within the container
                    else {
                        // Update visibleItemsWidth with new width
                        visibleItemsWidth = newTotalWidth;
                    }
                }
            }
        }
    }


    return {
        mainNav: mainNav,
        stickyNav: stickyNav,
        childNavPosition: childNavPosition,
        tabButtonNav: tabButtonNav,
        collapseNav: collapseNav,
        pageNav: pageNav,
    }


}());