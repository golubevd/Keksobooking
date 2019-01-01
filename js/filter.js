'use strict';
(function(){
    //Количество отображаемых объектов на экране
    var PINS_LIMIT=5;
    //Массив цен 
    var PRICE_RANGE={
        LOW:{
            MIN:0,
            MAX:10000
        },
        MIDDLE:{
            MIN:10000,
            MAX:50000
        },
        HIGH:{
            MIN:50000,
            MAX:Infinity
        }
    };
    
    var data = [];
    var filteredOffer=[];

    var mapFilter = document.querySelector('.map__filters');
    var selectByType= mapFilter.querySelector('#housing-type');
    var selectByPrice = mapFilter.querySelector('#housing-price');
    var selectByRoomCount = mapFilter.querySelector('#housing-rooms');
    var selectByGuestsCount = mapFilter.querySelector('#housing-guests');
    var featuresFieldset = mapFilter.querySelector('#housing-features');
    var selectFilters = mapFilter.querySelectorAll('.map__filter');
    var inputFilters = mapFilter.querySelectorAll('.map__filter-set input');
    var selectItems = mapFilter.querySelectorAll('select, input');
    //Фильтрация объектов по типу объекта и значению    
    var filtrationItems = function(it, item, key){
        return it.value === 'any' ? true : it.value === item[key].toString();
    };
     //Фильтрация объектов по типу жилья  
    var filtrationByType= function(item){
        return filtrationItems(selectByType, item.offer, 'type');
    };
     //Фильтрация объектов по цене  
    var filtrationByPrice = function(item){
       var filteringPrice = PRICE_RANGE[selectByPrice.value.toUpperCase()];
        return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true; 
    };
     //Фильтрация объектов по количеству комнат
    var filtrationByRooms = function(item){
        return filtrationItems(selectByRoomCount, item.offer, 'rooms');
    };
     //Фильтрация объектов по количеству гостей
    var filtrationByGuests = function(item){
        return filtrationItems(selectByGuestsCount, item.offer, 'guests');
    };
     //Фильтрация объектов по доп опциям.
    var filtrationByfeatures=function(item){
        var checkedFeatures = featuresFieldset.querySelectorAll('input:checked');
        return Array.from(checkedFeatures).every(function(element){
            return item.offer.features.includes(element.value);
        });
    };
    //Отрисовка объектов согласно установленных фильтров
    var onFiltersChange = window.debounce(function(){
        filteredOffer = data.slice(0);
        filteredOffer=       filteredOffer.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByfeatures);
        window.pin.removePin();
        window.card.removeCard();
        window.pin.renderPins(filteredOffer.slice(0, PINS_LIMIT),window.map.pinsMap);
        
    });
    
   //Сброс полей фильтра 
    var resetFilter = function(){
        selectItems.forEach(function(element){
           element.value='any'; 
        });
    };
    //Сброс доп полей 
    var resetFeatures=function(){
   var featureInputsReset = featuresFieldset.querySelectorAll('input');
   featureInputsReset.forEach(function(element){
       element.checked = false;
   });
    }
        
   // Активация фильра 
     var activateFiltration = function (adData) {
     data = adData.slice(0);
     onFiltersChange();
     mapFilter.addEventListener('change', onFiltersChange);
    return adData.slice(0, PINS_LIMIT);
  };
    
    window.filter={
        activate:activateFiltration,
        resetFilter:resetFilter,
        resetFeatures:resetFeatures
    }
    
    
})();