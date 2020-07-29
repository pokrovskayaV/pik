import initPopup from "./parts/popup";
import initSliders from "./parts/sliders";
import initValid from "./parts/form";
import storage from "./parts/storage";

$(document).ready(() => {
  initPopup();
  initSliders();
  initValid();
  storage();
  
  $('.js-lazy').each((index, el) => {
    const $image = $(el);
    const realSrc = $image.attr('data-src');

    $image.attr('src', realSrc);
    
  });


});
