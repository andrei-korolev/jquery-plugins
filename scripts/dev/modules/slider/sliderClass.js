'use strict';


let nc = window.nc || {};
    nc.modules = nc.modules || {};


nc.modules.sliderClass = ( () => {

    const SELECTORS = {
        active: '_active',
        arrowLeft: '_left',
        arrowRight: '_right',
        inslide: '_inslide',
        list: 'slider__list'

    }, TEXT = {
        backward: 'backward',
        forward: 'forward'
    };

    class Slider {
        constructor(options) {
            this.parent = options.element;
            this.init();
        }


        init() {
            this.initVars();
            this.bindEvents();
        }


        initVars() {
            this.list = this.parent.querySelector('.' + SELECTORS.list);
            this.firstSlide = this.list.firstElementChild;
            this.lastSlide = this.list.lastElementChild;
            this.activeSlide = this.list.querySelector('.' + SELECTORS.active) || this.firstSlide;
            this.arrowLeft = this.parent.querySelector('.' + SELECTORS.arrowLeft);
            this.arrowRight = this.parent.querySelector('.' + SELECTORS.arrowRight);
            this.duration = 500;

            moveSlide = debounce(moveSlide, this.duration);
        }


        bindEvents() {
            this.arrowLeft.addEventListener('click', clickLeft.bind(this));

            this.arrowRight.addEventListener('click', clickRight.bind(this));
        }
    }


    /*Helpers*/

    /*Click left*/
    function clickLeft(e) {
        let nextSlide = this.activeSlide.nextElementSibling || this.firstSlide;

        moveSlide.call(this, nextSlide, TEXT.forward);
    }


    /*Click right*/
    function clickRight(e) {
        let nextSlide = this.activeSlide.previousElementSibling || this.lastSlide;

        moveSlide.call(this, nextSlide, TEXT.backward);
    }


    /*To change slide of the main container*/
    function moveSlide(nextSlide, direction) {
        let widthSlide = getComputedStyle(this.activeSlide).width;

        if (direction === TEXT.forward) {
            nextSlide.style.left = widthSlide;

        } else {
            nextSlide.style.left = '-' + widthSlide;
        }

        setTimeout( () => {
            nextSlide.classList.add(SELECTORS.inslide);
            nextSlide.style.left = 0;

        }, 0);

        setTimeout( () => {
            nextSlide.classList.remove(SELECTORS.inslide);
            this.activeSlide.classList.remove(SELECTORS.active);
            this.activeSlide = nextSlide;
            this.activeSlide.classList.add(SELECTORS.active);

        },  this.duration);
    }


    /*Debounce*/
    function  debounce(f, time) {
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


    return Slider;


})();