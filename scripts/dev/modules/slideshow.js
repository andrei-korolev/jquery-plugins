'use strict';

let nc = window.nc || {},
    ncModules = nc.modules || {};


ncModules.slideshow = ( () => {

    let myObj = {};


    function init(element) {
        initVars(element);
        bindEvents();
    }
    
    
    function initVars(element) {
        myObj.display = myObj.main.querySelector('.slideshow__display');
        myObj.mainImage = myObj.display.querySelector('.slideshow__image');
        myObj.list = myObj.main.querySelector('.slideshow__list');
        myObj.duration = parseInt(getComputedStyle(myObj.mainImage).transitionDuration) * 1000;

        changeImage = debounce(changeImage, myObj.duration);

        console.log(myObj.duration);
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

        myObj.item = target.closest('.slideshow__item');

        if (!myObj.item || myObj.item === myObj.lastItem) {
            return;
        }

        myObj.image = myObj.item.querySelector('.slideshow__image');
        myObj.src = getNewSrc();
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


    /*Hide image*/
    function hideImage() {
        myObj.mainImage.style.opacity = 0;

        console.log("done hide");

        setTimeout(() => {
            setNewSrc();
            showImage();
            console.log(myObj.duration);
        }, myObj.duration);
    }


    /*Show image*/
    function showImage() {
        myObj.mainImage.style.opacity = 1;
        console.log("done show");
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