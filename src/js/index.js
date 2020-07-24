import initPopup from "./parts/popup";
import initSliders from "./parts/sliders";
import initValid from "./parts/form";
import storage from "./parts/storage";

$(document).ready(() => {
  initPopup();
  initSliders();
  initValid();
  storage();
});
