export default function initPopup() {
  $(".menu__popap").magnificPopup({
    type: "inline",
    removalDelay: 400, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function() {
         this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
    midClick: true 
  });
}
