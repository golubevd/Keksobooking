'use strict';
(function(){
    
    var DEBOUNCE_INTERVAL=2000;
    window.debounce=function(fun){
        var lastTimeOut=null;
        return function(){
            var args = arguments;
            if(lastTimeOut){
                window.clearTimeout(lastTimeOut);
            }
            lastTimeOut=window.setTimeout(function(){
                fun.apply(null,args);
            },DEBOUNCE_INTERVAL);
        }
    }
    
})();