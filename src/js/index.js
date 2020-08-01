import initPopup from "./parts/popup";
import initSliders from "./parts/sliders";
import initValid from "./parts/form";
import storage from "./parts/storage";
import lazy from "./parts/lazyLoad";

$(document).ready(() => {
  lazy();
  initPopup();
  initSliders();
  initValid();
  storage();
});
