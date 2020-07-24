export default function initValid() {
  $(function() {
    $(".connection-block__form").on("submit", validate);

    function validateEmail(mail) {
      var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return re.test(String(mail).toLowerCase());
    }

    function sendForm() {
      $(".connection-block__forms").addClass("hidden");
      $(".connection-block__success").addClass("show");
    }

    function error() {
      $(".connection-block__email").addClass("error-color");
      $(".validate__error").text("Введите почту в формате xxx@xxx.xxx");
    }

    //Проверка почты и её отправка либо выведение ошибки
    function validate() {
      let email = $(".connection-block__email").val();
      if (validateEmail(email)) {
        sendForm();
        return false;
      } else {
        error();
        return false;
      }
    }
  });
}
