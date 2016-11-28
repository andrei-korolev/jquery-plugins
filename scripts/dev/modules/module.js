'use strict';

let nc = window.nc || {},
    ncModules = nc.modules || {};


ncModules.module = (function() {

    function init() {
        initVars();
        bindEvents();
    }
    
    
    function initVars() {}

    
    function bindEvents() {
        /*events*/
        $('.block').on('click', onClick);
    }


    
    init();
    
    
    
    /*Public Api*/
    return {};


    
    /*Helpers*/
    function onClick() {}
    
    
    
})();