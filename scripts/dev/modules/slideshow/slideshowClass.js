'use strict';


let nc = window.nc || {};
    nc.modules = nc.modules || {};


nc.modules.slideshowClass = ( () => {

    const SELECTORS = {
        display: 'slideshow__display',
        list: 'slideshow__list',
        item: 'slideshow__item',
        image: 'slideshow__image',
        active: '_active'
    },
        TEXT = {
            src: 'src',
            ms: 'ms'
    };


    class Slideshow {
        constructor(options) {
            this.init(options);
        }


        init(options) {
            this.initVars(options);
            this.bindEvents();
        }


        initVars(options) {
            this.parent = options.element;
            this.display = this.parent.querySelector('.' + SELECTORS.display);
            this.mainImage = this.display.querySelector('.' + SELECTORS.image);
            this.list = this.parent.querySelector('.' + SELECTORS.list);
            this.lastItem = this.list.querySelector('.' + SELECTORS.active) || null;
            this.duration = getDuration.call(this);

            changeImage = debounce(changeImage, this.duration);
        }


        bindEvents() {
            this.list.addEventListener('click', changeImage.bind(this));
        }
    }


    /*Helpers*/

    /*To change the picture of the main container*/
    function changeImage(e) {
        let target = e.target;

        this.item = target.closest('.' + SELECTORS.item);

        if (!this.item || this.item === this.lastItem) {
            return;
        }

        this.image = this.item.querySelector('.' + SELECTORS.image);
        this.src = getNewSrc.call(this);

        changeActiveMiniature.call(this);

        this.lastItem = this.item;

        hideImage.call(this);
    }


    /*Get new src*/
    function getNewSrc() {
        return this.image.dataset.src || this.image.getAttribute(TEXT.src);
    }


    /*Set new src*/
    function setNewSrc() {
        this.mainImage.src = this.src;
    }


    /*Get duration*/
    function getDuration() {
        let cssDuration = getComputedStyle(this.mainImage).transitionDuration,
            parseDuration =  parseInt(cssDuration);

        if (cssDuration.indexOf(TEXT.ms) === -1) {
            return parseDuration * 1000;
        }

        return parseDuration;
    }


    /*Change active miniature*/
    function changeActiveMiniature() {
        this.item.classList.add(SELECTORS.active);

        if (this.lastItem) {
            this.lastItem.classList.remove(SELECTORS.active);
        }
    }


    /*Hide image*/
    function hideImage() {
        this.mainImage.style.opacity = 0;

        setTimeout(() => {
            setNewSrc.call(this);
            showImage.call(this);
        }, this.duration);
    }


    /*Show image*/
    function showImage() {
        this.mainImage.style.opacity = 1;
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


    return Slideshow;


})();