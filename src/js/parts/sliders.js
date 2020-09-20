let initFullPage = () => {
  new fullpage('.fullpage', {
		anchors: ['Home', 'Unity', 'Services', 'Projects', 'Experience', 'Energo', 'Contacts'],
    responsiveWidth: 770,
    onLeave: function(origin, destination, direction){
      
      if(direction=="down") {
      var slideNumber = $('.fp-section.active').index()+2;
      } else if (direction=="up"){
      slideNumber = $('.fp-section.active').index();
      }
      let nextNumber = slideNumber+1;
       $('.aside__page-number._first').html(`0${slideNumber}`);
       if(slideNumber < 7) {
       $('.aside__page-number._last').html(`0${nextNumber}`);
       }     
    if(slideNumber>1) {
      $('.header__contacts').addClass('_hidden');
    } else {
      $('.header__contacts').removeClass('_hidden');
    }
    if(slideNumber >= 7) {
      $('.aside__arrow a').addClass('_hidden');
      } else {
        $('.aside__arrow a').removeClass('_hidden');
    }  
    if(origin.anchor == 'Unity' || origin.anchor == 'Projects' || origin.anchor == 'Energo'){
     $('.header__link').removeClass('_black');
      $('.aside__page-number, .aside__numbers').removeClass('_black');
    }
    else if(origin.anchor == 'Home' || origin.anchor == 'Services' || origin.anchor == 'Experience' || origin.anchor == 'Contacts') {
       $('.header__link').addClass('_black');
      $('.aside__page-number, .aside__numbers').addClass('_black');
      
    }
    },
  });
  $(document).on('click', '.aside__arrow a', function(){
    fullpage_api.moveSectionDown();
  });
};

let initSliderPartners = () => {
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    infinite: true,
    asNavFor: '.slider-x,.slider-nav',
    autoplay: false,
    autoplaySpeed: 2000,
  });
 $('.slider-x').slick({
     arrows: false,
     vertical: true,
     infinite: true,
    
   });
  $('.slider-nav').slick({
     asNavFor: '.slider-for,.slider-x',
      slidesToShow: 12,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      focusOnSelect: true,
      infinite: false,
    });
};


export default function initSliders() {
  initFullPage();
  initSliderPartners();
}
