'use strict';

(function(){
 //Координаты пина по умолчанию   
var DEFAULT_POSITION={
    x:600,
    y:375
       
};
//Высота иглы Пина    
var PINTAIL_HEIGHT=16;
//Функция установки координат по умодчанию    
var setDefaultPinCoords=function(){
    var mainPin = window.map.pinElement;
    var x= mainPin.offsetLeft;
    var y = mainPin.offsetTop;
    window.form.addressInput.value= 'x:'+ x +', '+'y:' + y;    
};
    
//Сброс координат и позции пина   
var resetPinPosition=function(elem, coords,inputField){
    elem.style.left=coords.x+'px';
    elem.style.top=coords.y+'px';
    inputField.value='x:'+ coords.x +', '+'y:' + coords.y;
};
    

//Ограничения по перемещению пина на экране
var PinLimits={
    x:{
        left: window.map.pinElement.offsetWidth,
        right: window.map.pinElement.offsetWidth,
      },
    y:{
        top: 100+window.map.pinElement.offsetHeight/2,
         bottom: window.map.pinsMap.offsetHeight-window.map.pinElement.offsetHeight*2-500
        }
};
//Ативация перетаскивания пина   
var enablePinDrag= function(handleElement, dragElement, extraLimits, callback){
    dragElement=dragElement|| handleElement;
        
        var noLimits={
            x:{
                left:0,
                right:0
            },
            y:{
                top:0,
                bottom:0
            }
        };
        
        var limits = Object.assign(noLimits, extraLimits);
        
        handleElement.addEventListener('mousedown',function(evt){
                evt.preventDefault();
            
             var clickInsideOffsetItem={
                 x:evt.clientX-dragElement.offsetLeft,
                 y:evt.clientY-dragElement.offsetTop+PINTAIL_HEIGHT
                };
            
            var dragElementCenterWidth = dragElement.offsetWidth/2;
            var dragElementCenterHeight = dragElement.offsetHeight/2;
            
            var minElementCoords={
                x:dragElementCenterWidth+limits.x.left,
                y:dragElementCenterHeight+limits.y.top+PINTAIL_HEIGHT
            };
            
            var maxElementCoords={
                x:dragElement.parentNode.offsetWidth-dragElementCenterWidth-limits.x.right,
                y:dragElement.parentNode.offsetHeight-dragElementCenterHeight-limits.y.bottom-PINTAIL_HEIGHT
            };
            
            
            var onHandleElementMouseDown=function(moveEvt){
                
                var moveCoords={
                    x:moveEvt.clientX-clickInsideOffsetItem.x,
                    y:moveEvt.clientY-clickInsideOffsetItem.y
                };
                
                var moveElementNewCoords={
                    x: Math.max(minElementCoords.x, Math.min(moveCoords.x,maxElementCoords.x)),
                    y: Math.max(minElementCoords.y, Math.min(moveCoords.y, maxElementCoords.y))+PINTAIL_HEIGHT
                };
                
                dragElement.style.left=moveElementNewCoords.x+'px';
                dragElement.style.top=moveElementNewCoords.y+'px';
                
                if(typeof callback ==='function'){
                    callback();
                }
             };
                
                var onElementMouseUp=function(upEvt){
                    upEvt.preventDefault();
                    
                    document.removeEventListener('mousemove', onHandleElementMouseDown);
                    document.removeEventListener('mouseup',onElementMouseUp);
                };
                    document.addEventListener('mousemove', onHandleElementMouseDown);
                    document.addEventListener('mouseup',onElementMouseUp);
                   
        });
      
    };
    
       
    window.utils={
        setDefaultPinCoords:setDefaultPinCoords,
        enablePinDrag:enablePinDrag,
        PinLimits:PinLimits,
        resetPinPosition:resetPinPosition,
        DEFAULT_POSITION:DEFAULT_POSITION
    }
    
})();