'use strict';
(function(){
    
var startMap = document.querySelector('.map');
var overlayMap = document.querySelector('.map__pinsoverlay');
var pinsMap = startMap.querySelector('.map__pins');
var pinElement = document.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var filtersForFeatures = startMap.querySelector('.map__filters');
var featureCheckboxElement=filtersForFeatures.querySelectorAll('input[type="checkbox"]');
var filterForSelect = filtersForFeatures.querySelectorAll('select');

var ESC_KEYCODE=27;
var ENTER_KEYCODE=13;

var generatRandomeInRange = function(min, max){
    var result=Math.floor(Math.random()*(max - min+1)+min);
    return result;
};

var generateArrayIndex=function(arr){
    return arr.splice([Math.floor(Math.random()*arr.length)],1);
};


var checkArrayContaiElement=function(array, element){
for(var i=0; i<array.length;i++){
    if(array[i]===element){
        return true;
    }
    return false;
}
};


//Отключение полей выбора
var setDisableElement = function(element){
    element.forEach(function(item){
        item.disabled=true;
    });
};
   setDisableElement(filterForSelect);
   setDisableElement(featureCheckboxElement);
    
//Включение полей выбора
var removeDisableElement=function(element){
 element.forEach(function(item){
        item.disabled=false;
    });
};
   
// Загрузка данных с сервера
var onLoadSuccess = function (adData) {
window.filter.activate(adData);
};
    

//Активация основного экрана
var onPinMouseUp=function(evt){
   evt.preventDefault();
    startMap.classList.remove('map--faded');
    window.form.noticeElement.classList.remove('notice__form--disabled');
    removeDisableElement(window.form.disableElements);
    removeDisableElement(filterForSelect);
    removeDisableElement(featureCheckboxElement);
    window.backend.load(onLoadSuccess,window.backend.renderErrorMessage);
    window.form.activate();
    window.utils.setDefaultPinCoords();
    window.utils.enablePinDrag(pinElement,pinElement,window.utils.PinLimits, window.utils.setDefaultPinCoords); 
        
    pinElement.removeEventListener('mouseup', onPinMouseUp);
   };


//Просмотр и выбор отрисованных пинов
var pinContainerClickHandler=function(evt){
    
    var allPins= pinsMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    var allCards= startMap.querySelectorAll('.popup');
    allPins.forEach(function(elem,i){
        if(evt.target.parentElement===elem || elem===document.activeElement){
            window.pin.removeActivePin();
            window.card.hideCard();
            elem.classList.add('.map__pin--acctive');
            allCards[i].classList.remove('hidden');
            startMap.addEventListener('click',closeOffer);
            document.addEventListener('keydown',closeOffer);
        }
    });
};

//Закрыть открытое предложение    
var closeOffer=function(evt){
    if(evt.type === 'keydown' && evt.keyCode=== ESC_KEYCODE || evt.type ==='click' && evt.target.classList.contains('popup__close')){
        window.pin.removeActivePin();
        window.card.hideCard();
        startMap.removeEventListener('click',closeOffer);
        document.removeEventListener('keydown',closeOffer);
    }
    
};


pinsMap.addEventListener('click',pinContainerClickHandler);
pinElement.addEventListener('mouseup', onPinMouseUp);

    
    window.map={
        startMap: startMap, 
        overlayMap:overlayMap,
        pinsMap:pinsMap,
        pinElement:pinElement,
        pinTemplate:pinTemplate, 
        filtersForFeatures: filtersForFeatures, 
        featureCheckboxElement:featureCheckboxElement,
        filterForSelect:filterForSelect,
        setDisableElement:setDisableElement,
        removeDisableElement:removeDisableElement,
        onLoadSuccess:onLoadSuccess
        
    }
    
  
})();
