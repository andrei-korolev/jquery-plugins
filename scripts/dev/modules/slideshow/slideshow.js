'use strict';

let nc = window.nc || {};
    nc.modules = nc.modules || {};


nc.modules.slideshow = ( () => {

    let myObj = {},
        SELECTORS = {
            display: 'slideshow__display',
            list: 'slideshow__list',
            item: 'slideshow__item',
            image: 'slideshow__image',
            active: '_active'
        };


    function init(element) {
        initVars(element);
        bindEvents();
    }


    function initVars(element) {
        myObj.display = myObj.main.querySelector('.' + SELECTORS.display);
        myObj.mainImage = myObj.display.querySelector('.' + SELECTORS.image);
        myObj.list = myObj.main.querySelector('.' + SELECTORS.list);
        myObj.lastItem = myObj.list.querySelector('.' + SELECTORS.active) || null;
        myObj.duration = parseInt(getComputedStyle(myObj.mainImage).transitionDuration) * 500;

        changeImage = debounce(changeImage, myObj.duration);
    }


    function bindEvents() {
        /*events*/
        myObj.list.addEventListener('click', changeImage);
    }


    return (element) => {
        myObj.main = element;

        init();

        /*Public Api*/
        return {

        }


    };


    /*Helpers*/

    /*To change the picture of the main container*/
    function changeImage(e) {
        let target = e.target;

        myObj.item = target.closest('.' + SELECTORS.item);

        if (!myObj.item || myObj.item === myObj.lastItem) {
            return;
        }

        myObj.image = myObj.item.querySelector('.' + SELECTORS.image);
        myObj.src = getNewSrc();

        changeActiveMiniature();

        myObj.lastItem = myObj.item;

        hideImage();
    }


    /*Get new src*/
    function getNewSrc() {
        return myObj.image.dataset.src || myObj.image.getAttribute('src');
    }


    /*Set new src*/
    function setNewSrc() {
        myObj.mainImage.src = myObj.src;
    }


    /*Change active miniature*/
    function changeActiveMiniature() {
        myObj.item.classList.add(SELECTORS.active);

        if (myObj.lastItem) {
            myObj.lastItem.classList.remove(SELECTORS.active);
        }
    }


    /*Hide image*/
    function hideImage() {
        myObj.mainImage.style.opacity = 0;

        setTimeout(() => {
            setNewSrc();
            showImage();
        }, myObj.duration);
    }


    /*Show image*/
    function showImage() {
        myObj.mainImage.style.opacity = 1;
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


})();