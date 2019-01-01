'use strict';
(function(){
    
    var PIN_HEIGHT = 46;
    var PIN_WIDTH = 46;
   //Создание шаблона пина 
   var createPin = function(postingData){
    var pinElemet = window.map.pinTemplate.cloneNode(true);
    pinElemet.style.left = postingData.location.x - PIN_WIDTH/2 +'px';
    pinElemet.style.top = postingData.location.y+PIN_HEIGHT+'px';
    pinElemet.querySelector('img').src= postingData.author.avatar;
    pinElemet.querySelector('img').alt=postingData.offer.title;
    pinElemet.classList.add('map__pin');
    pinElemet.style.cursor='pointer';
    window.card.createCard(postingData);
    return pinElemet;
};
    //Рендеринг пина
    var renderPins=function(array, element){
    var fragment = document.createDocumentFragment();
   array.forEach(function(elem, index){
     var pin=createPin(elem);
        pin.setAttribute('id',index);
        fragment.appendChild(pin);
        
    });
    element.appendChild(fragment);
};

    
    //Удаление пина
    var removePin = function(){
    var pins = window.map.startMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function(elem){
        elem.remove();
    });
  
};
    //Удаления активного поля с пина
    var removeActivePin=function(){
    var activePin = window.map.startMap.querySelector('.map__pin--active');
    if(activePin){
        activePin.classList.remove('map__pin--active');
    }
};
    
    window.pin={
        renderPins:renderPins,
        removePin:removePin,
        removeActivePin:removeActivePin
    }
    
})();