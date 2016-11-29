'use strict';

$.fn.moduleJquery = function(options = {}) {

    console.log(options);

    let $this = this,
        $block; //$('.block').moduleJquery();  => $this = $('.block');



    function init() {
        initVars();
        bindEvents();
    }


    function initVars() {
        $block = $('.block');
    }


    function bindEvents() {
        /*events*/
        $block.on('click', onClick);
    }


    init();


    /*Public Api*/
    return {};


    /*Helpers*/
    function onClick() {
    }


};