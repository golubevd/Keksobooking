'use strict';
(function(){
    
    var URLS={
        LOAD:'https://js.dump.academy/keksobooking/data',
        SAVE:'https://js.dump.academy/keksobooking'
    };
    
    var errorMassage={
        ERROR_LOAD:'Произошла ошибка загрузки. Пожалуйста обновите страницу',
        ERROR_SERVER:'Произошла ошибка соединения. Пожалуйста обновите страницу',
        ERROR_TIMEOUT:'Сервер не отвечает. Пожалуйста обновите страницу'
    };
    
    var createXHR= function(method,url,onLoad,onError){
        var xhr= new XMLHttpRequest();
        xhr.responseType='json';
        xhr.addEventListener('load',function(){
            if(xhr.status===200){
                onLoad(xhr.response);
            }else{
                onError(errorMassage.ERROR_LOAD);
            }
        });
        
        xhr.addEventListener('error',function(){
            onError(errorMassage.ERROR_SERVER);
        });
        
        xhr.addEventListener('timeout',function(){
            onError(errorMassage.ERROR_TIMEOUT);
        });
        xhr.open(method,url);
        return xhr;
    };
    
    var load = function(onload, onError){
        createXHR('GET',URLS.LOAD,onload,onError).send();
    };
    var upload=function(onload, onError,data){
        createXHR('POST',URLS.SAVE,onload,onError).send(data);
    };
    
    var renderErrorMessage = function (errorMessage) {
    var message = document.createElement('div');
    message.classList.add('error-message');
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
     };
    
    window.backend={
        load:load,
        upload:upload,
        renderErrorMessage:renderErrorMessage
    };
    
    
    
})();