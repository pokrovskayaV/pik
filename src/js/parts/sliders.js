//main-top
let initSlidersTop = () => {
  $(".js__slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: false,
    asNavFor: ".js__slider-nav"
  });
  $(".js__slider-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    asNavFor: ".js__slider-for",
    dots: false,
    focusOnSelect: true,
    infinite: false,
    vertical: true
  });
};

//main-bottom
let initSliderBottom = () => {
  $(".js__multiple-slider").slick({
    infinite: true,
    slidesToShow: 3,
    variableWidth: true,
    slidesToScroll: 1,
    arrows: true
  });
};

export default function initSliders() {
  initSlidersTop();
  initSliderBottom();
}
