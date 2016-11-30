'use strict';

let nc = window.nc || {},
    ncModules = nc.modules || {};


ncModules.slideshow = ( () => {

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
            this.SELECTORS = {
                display: 'slideshow__display',
                list: 'slideshow__list',
                item: 'slideshow__item',
                image: 'slideshow__image'
            };

            this.display = this.parent.querySelector('.' + this.SELECTORS.display);
            this.mainImage = this.display.querySelector('.' + this.SELECTORS.image);
            this.list = this.parent.querySelector('.' + this.SELECTORS.list);
            this.duration = parseInt(getComputedStyle(this.mainImage).transitionDuration) * 500;

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

        self.item = target.closest('.' + self.SELECTORS.item);

        if (!self.item || self.item === self.lastItem) {
            return;
        }

        self.image = self.item.querySelector('.' + self.SELECTORS.image);
        self.src = getNewSrc();
        self.lastItem = self.item;

        hideImage();
    }


    /*Get new src*/
    function getNewSrc() {
        return self.image.dataset.src || self.image.getAttribute('src');
    }


    /*Set new src*/
    function setNewSrc() {
        self.mainImage.src = self.src;
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


    return () => {
        return (options) => {
            return new Slideshow(options);
        }
    }
})();