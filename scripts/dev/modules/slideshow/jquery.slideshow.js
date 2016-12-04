;(function($) {
    'use strict';

    $.fn.slideshow = function() {

        const SELECTORS = {
            display: 'slideshow__display',
            list: 'slideshow__list',
            item: 'slideshow__item',
            image: 'slideshow__image',
            active: '_active'
        },
            TEXT = {
                src: 'src',
                transitionDuration: 'transition-duration'
        };

        let $display,
            $image,
            $item,
            $lastItem,
            $list,
            $mainImage,
            $parent,
            $this = this,

            src,
            duration;


        function init() {
            initVars();
            bindEvents();
            disableCssAnimations();
        }


        function initVars() {
            $parent = $this;
            $display = $parent.find('.' + SELECTORS.display);
            $mainImage = $display.find('.' + SELECTORS.image);
            $list = $parent.find('.' + SELECTORS.list);
            $lastItem = $list.find('.' + SELECTORS.active) || null;

            duration = parseInt($mainImage.css(TEXT.transitionDuration)) * 500 || 500;
            changeImage = debounce(changeImage, duration);
        }


        function bindEvents() {
            /*events*/
            $list.on('click', changeImage);
        }


        init();


        /*Helpers*/


        function disableCssAnimations() {
            $mainImage.css(TEXT.transitionDuration, 0 + 's');
        }


        /*To change the picture of the main container*/
        function changeImage(e) {
            let target = e.target;

            $item = $(target.closest('.' + SELECTORS.item));

            if (!$item || $item === $lastItem) {
                return;
            }

            $image = $item.find('.' + SELECTORS.image);
            src = getNewSrc();

            changeActiveMiniature();

            $lastItem = $item;

            hideImage();
        }


        /*Get new src*/
        function getNewSrc() {
            return $image.data(TEXT.src) || $image.attr(TEXT.src);
        }


        /*Set new src*/
        function setNewSrc() {
            $mainImage.attr(TEXT.src, src);
        }


        /*Change active miniature*/
        function changeActiveMiniature() {
            $item.addClass(SELECTORS.active);

            if ($lastItem.length) {
                $lastItem.removeClass(SELECTORS.active);
            }
        }


        /*Hide image*/
        function hideImage() {
            $mainImage.fadeOut(duration, function() {
                setNewSrc();
                showImage();
            });
        }


        /*Show image*/
        function showImage() {
            $mainImage.fadeIn(duration);
        }


        /*Debounce*/
        function debounce(f, time) {
            let status = true;

            return function() {

                if (status) {
                    f.apply(this, arguments);

                    status = false;

                    setTimeout(() => {
                        status = true;
                    }, time);
                }
            }
        }


        return $this;

    };


})(jQuery);