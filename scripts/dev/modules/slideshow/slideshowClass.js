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
            src: 'src'
    };

    let self;

    class Slideshow {
        constructor(options) {
            this.parent = options.element;
            this.init();
            self = this;
        }


        init() {
            this.initVars();
            this.bindEvents();
        }


        initVars() {
            this.display = this.parent.querySelector('.' + SELECTORS.display);
            this.mainImage = this.display.querySelector('.' + SELECTORS.image);
            this.list = this.parent.querySelector('.' + SELECTORS.list);
            this.lastItem = this.list.querySelector('.' + SELECTORS.active) || null;
            this.duration = parseInt(getComputedStyle(this.mainImage).transitionDuration) * 500 || 500;

            changeImage = debounce(changeImage, this.duration);
        }


        bindEvents() {
            /*events*/
            this.list.addEventListener('click', changeImage);
        }
    }


    /*Helpers*/

    /*To change the picture of the main container*/
    function changeImage(e) {
        let target = e.target;

        self.item = target.closest('.' + SELECTORS.item);

        if (!self.item || self.item === self.lastItem) {
            return;
        }

        self.image = self.item.querySelector('.' + SELECTORS.image);
        self.src = getNewSrc();

        changeActiveMiniature();

        self.lastItem = self.item;

        hideImage();
    }


    /*Get new src*/
    function getNewSrc() {
        return self.image.dataset.src || self.image.getAttribute(TEXT.src);
    }


    /*Set new src*/
    function setNewSrc() {
        self.mainImage.src = self.src;
    }


    /*Change active miniature*/
    function changeActiveMiniature() {
        self.item.classList.add(SELECTORS.active);

        if (self.lastItem) {
            self.lastItem.classList.remove(SELECTORS.active);
        }
    }


    /*Hide image*/
    function hideImage() {
        self.mainImage.style.opacity = 0;

        setTimeout(() => {
            setNewSrc();
            showImage();
        }, self.duration);
    }


    /*Show image*/
    function showImage() {
        self.mainImage.style.opacity = 1;
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