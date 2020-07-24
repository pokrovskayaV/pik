//main-top
function initSlidersTop() {
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: false,
    asNavFor: ".slider-nav"
  });
  $(".slider-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    asNavFor: ".slider-for",
    dots: false,
    focusOnSelect: true,
    infinite: false,
    vertical: true
  });
}

//main-bottom
function initSliderBottom() {
  $(".multiple-items").slick({
    infinite: true,
    slidesToShow: 3,
    variableWidth: true,
    slidesToScroll: 1,
    arrows: true
  });
}

export default function initSliders() {
  initSlidersTop();
  initSliderBottom();
}
