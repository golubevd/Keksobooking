'use strict';
(function(){
    
  var offerCard=document.querySelector('template').content;
  var filtersContainer = document.querySelector('.map__filters-container');
  var filters = document.querySelector('.map__filters');

//Рендеринг доп опций
  var renderFeatures=function(arr){
      var fragment = document.createDocumentFragment();
      for(var i=0;i<arr.length;i++){
      var container = document.createElement('li');
          container.className='feature';
          container.classList.add('feature--' + arr[i]);
          fragment.appendChild(container);
            
        };
        return fragment;
   };

//Рендеринг галереи фото в карточке
    var filGallery = function(arr){
        var photoFragment = document.createDocumentFragment();
        for(var i=0;i<arr.length;i++){
        var liElement=document.createElement('li')
        var photoItem = document.createElement('img');
        liElement.append(photoItem);
        var photoItemNext = liElement.cloneNode(true);
        photoItem.src = arr[i];
        photoItem.style.width='40px';
        photoItem.style.height='40px';
        photoItem.style.marginLeft='5px';
        photoFragment.appendChild(liElement);
        
        };
        return photoFragment;
    }; 
//Создание шаблона карточки объекта
    var createCard=function(cardData){
    var card=offerCard.querySelector('.map__card')
    var cardElement= card.cloneNode(true);
    
    var russainText=function(){
        var offerType=cardData.offer.type;
        switch(offerType){
            case 'flat':
                return 'Квартира';
                break;
            case 'house':
                return 'Дом';
            case 'bungalo':
                return 'Бунгало';
                break;
            default: return 'Дворец';
            
           };
    };
    
    var guestText= function(){
        var guestNumber = cardData.offer.guests;
        if(guestNumber === 1){
            return guestNumber+' гостя';
        } 
         return guestNumber+' гостей';
    };
         
    cardElement.querySelector('h3').textContent = cardData.offer.title;
    cardElement.querySelector('p small').textContent= cardData.offer.adress;
    cardElement.querySelector('.popup__price').textContent=cardData.offer.price+' ₽/ночь';
    cardElement.querySelector('h4').textContent=russainText();
    cardElement.querySelector('.popup__type--capacity').textContent=cardData.offer.rooms + ' комнаты для ' + guestText();
    cardElement.querySelector('.popup__time').textContent='Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(renderFeatures(cardData.offer.features));
    cardElement.querySelector('.popup__description').textContent=cardData.offer.description;
    cardElement.querySelector('.popup__pictures').innerHTML = '';
    cardElement.querySelector('.popup__pictures').appendChild(filGallery(cardData.offer.photos));
    cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;
    cardElement.classList.add('hidden');
    window.map.startMap.insertBefore(cardElement,filtersContainer);
        return cardElement;
     };
//Удаление карточки объекта    
var removeCard = function(){
    var cards = window.map.startMap.querySelectorAll('.popup');
    cards.forEach(function(elem){
        elem.remove();
        });

    };
    
    
    //Закрытие карточки 
var hideCard=function(){
    var offerCards=window.map.startMap.querySelectorAll('.popup');
    offerCards.forEach(function(elem){
        if(elem.classList.contains('.hidden') !==true){
            elem.classList.add('hidden');
        }
    });
};
    
        
    window.card={
        removeCard:removeCard,
        createCard:createCard,
        hideCard:hideCard
    }


})();