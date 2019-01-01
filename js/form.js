'use strict';
(function(){
var noticeElement= document.querySelector('.notice__form');
var addressInput= document.querySelector('#address');
var resetBtn=document.querySelector('.form__reset');
var submitBtn=document.querySelector('.form__submit');
var titleInput=document.querySelector('#title');
var buildType = document.querySelector('#type');
var price=document.querySelector('#price');
var timeIn= document.querySelector('#timein');
var timeOut= document.querySelector('#timeout');
var roomNumber= document.querySelector('#room_number');
var guestsNumber =document.querySelector('#capacity');
var CHECK_TIMES=['12:00', '13:00', '14:00'];    
    
    
//Выбор всех полей формы    
var disableElements =noticeElement.querySelectorAll('fieldset');
//Отключение полей формы
 window.map.setDisableElement(disableElements);


//Проверка заголовка на валидность
titleInput.addEventListener('invalid',function(){
    if(titleInput.validity.tooShort){
        titleInput.setCustomValidity('Минимальная длина заголовка 30 символов.');
    }else if(titleInput.validity.tooLong){
       titleInput.setCustomValidity('Длина заголовка не может быть больше 100 символов.'); 
    }else if(titleInput.validity.valueMissing){
       titleInput.setCustomValidity('Обязательное поле для заполнения.');  
    }else {
       titleInput.setCustomValidity('');    
    }
});
    
   //Вывод ошибок 
  var checkErorrs = function () {
    var inputs =noticeElement.querySelectorAll('input');
    inputs.forEach(function (elem) {
      if (elem.checkValidity() === false) {
        elem.classList.add('validation-error');
      } else {
        elem.classList.remove('validation-error');
      }
    });
  };
          
    //Синхронизация по значению
    var syncValues=function(element, values){
        element.value=values;
    };
    
    //Синхронизация по минимальному значению
    var syncWithMin =function(element, value){
        element.min=value;
    };
    
    //Синхронизация полей выбора в форме
    var synhronizeFields=function(firstField, secondField, firstFieldValue, secondFieldValue, callback){
    var enumElement=firstFieldValue.indexOf(firstField.value);
    var dependetValue = secondFieldValue[enumElement];
        if(typeof callback==='function'){
            callback(secondField, dependetValue);
        }
        
    };
    //Синхронизация по типу жилья - цене
    var typeSelectPrice= function(){
        var typeOfferPrice={
        'flat':1000,
        'bungalo':0,
        'house':5000,
        'palace':10000
        }
        synhronizeFields(buildType,price,Object.keys(typeOfferPrice), Object.values(typeOfferPrice),syncWithMin);
    };
    
    
    //Синхроницазция по времени вьезда
    var timeInSelectHandler=function(){
        synhronizeFields(timeIn, timeOut,CHECK_TIMES,CHECK_TIMES,syncValues);
    };
    
    //Синхроницазция по времени выезда
    var timeOutSelectHandler=function(){
       synhronizeFields(timeOut,timeIn,CHECK_TIMES,CHECK_TIMES,syncValues); 
    };
    
  //Синхронизация по количеству комнат и голичеству гостей
    var roomSelectHandler=function(){
        var ROOM_QUANTITY={
            '1':['1'],
            '2':['1','2'],
            '3':['1','2','3'],
            '100':['0']
        };
        
        var roomQuantity= roomNumber.value;
        var gusetQuantity= guestsNumber.options;
        var isSelected=false;
        
        for(var i = 0; i < gusetQuantity.length; i++){
            var choosenRoom = ROOM_QUANTITY[roomQuantity];
            var isDisabled = choosenRoom.indexOf(gusetQuantity[i].value) === -1;
            gusetQuantity[i].selected=false;
            gusetQuantity[i].disabled=isDisabled;
            if(!isSelected && !isDisabled){
                gusetQuantity[i].selected=true;
                isSelected=true;
            }
        }
        
    };
    
    
//Смена аватарки

var ImageSize={
    WIDTH:'70px',
    HEIGHT:'70px',
    BORDER_RADIUS:'5px'
}

var DEFAULT_AVATAR='img/muffin-default.png';
var FILES_TYPE=['gif','png','jpeg','jpg','bmp'];
var failChoiser = document.querySelector('#avatar');
var avatarPriview= document.querySelector('.notice__preview img');
var imagesContainer = document.querySelector('.ad-form__photo-container');
var imagesPriview = document.querySelector('#images');

//Проверка расширения файла
var checkFileType=function(file){
    return FILES_TYPE.some(function(it){
        return file.name.toLowerCase().endsWith(it);
    });
};

//Присвоение ссылки при смене аватарки
var changeAvatar=function(src){
    avatarPriview.src=src;
};
 
//Создание блока для добавленных фото.
var createImageBlock=function(src){
var newImageWrap = document.createElement('div');
var newImage= document.createElement('img');
newImageWrap.classList.add('ad-form__photo');
newImageWrap.classList.add('form__photo--added');
newImage.src=src;
newImage.style.width=ImageSize.WIDTH;
newImage.style.height=ImageSize.HEIGHT;
newImage.style.borderRadius=ImageSize.BORDER_RADIUS;
newImageWrap.appendChild(newImage);
imagesContainer.appendChild(newImageWrap);
};

//Функция загрузки фотографий
var loadFile=function(chooser, func){
    var files =Array.from(chooser.files).filter(checkFileType);
    if(files){
        files.forEach(function(it){
            var reader = new FileReader();
            reader.addEventListener('load', function(evt){
                func(evt.target.result);
            });
            reader.readAsDataURL(it);
        });
    }
};

//Загрузка нового фото в аватар
var onAvatarChange=function(evt){
    loadFile(evt.target,changeAvatar);
};
    
//Загрузка дополнительных фото
var onPhotoChange=function(evt){
    loadFile(evt.target, createImageBlock);
};

//Сброс формы
var resetForm=function(){
    avatarPriview.src=DEFAULT_AVATAR;
    var addImages=document.querySelectorAll('.form__photo--added');
    if(addImages){
        addImages.forEach(function(it){
            it.remove();
        });
    }
    window.filter.resetFilter();
    window.filter.resetFeatures();
};
        
   //Успешная отпрака формы 
var sucessHandler=function(){
    var node =document.createElement('div');
    node.classList.add('success-message');
    node.textContent='Данные успешно отправлены';
    document.body.insertAdjacentElement('afterbegin',node);
    setTimeout(function(){
        document.body.removeChild(node);
    },3000);
        
};
    
  //Активация полей смены фото и аватара  
  var activate = function(){
    failChoiser.addEventListener('change',onAvatarChange);
    imagesPriview.addEventListener('change',onPhotoChange);
  };
   
    
    roomSelectHandler();
    typeSelectPrice();
    buildType.addEventListener('change',typeSelectPrice);
    timeIn.addEventListener('change',timeInSelectHandler);
    timeOut.addEventListener('change',timeOutSelectHandler);
    roomNumber.addEventListener('change', roomSelectHandler);
    submitBtn.addEventListener('click',checkErorrs);
    resetBtn.addEventListener('click',function(evt){
        evt.preventDefault();
        resetForm();
        noticeElement.reset();
        roomSelectHandler();
        setTimeout(function(){
            window.utils.resetPinPosition(window.map.pinElement,window.utils.DEFAULT_POSITION,addressInput);
            window.backend.load(window.map.onLoadSuccess,window.backend.renderErrorMessage);
        },100);
    }); 
      
      noticeElement.addEventListener('submit', function(evt){
        var formData=new FormData(noticeElement);
        window.backend.upload(function(){
             window.filter.resetFilter();
            window.filter.resetFeatures();
            noticeElement.reset();
            resetForm();
            window.utils.resetPinPosition(window.map.pinElement,window.utils.DEFAULT_POSITION,addressInput);
            roomSelectHandler();
            typeSelectPrice();
            sucessHandler();  
            window.backend.load(window.map.onLoadSuccess,window.backend.renderErrorMessage);
        }, window.backend.renderErrorMessage,formData);
        evt.preventDefault();
    });
    
    
    window.form={
        noticeElement: noticeElement,
        activate:activate,
        disableElements:disableElements,
        addressInput:addressInput
      }
    
})();