export default function initValid() {
  $(".js__form").on("submit", validate);

  let validateEmail = mail => {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(mail).toLowerCase());
  };

  let sendForm = () => {
    $(".js__form-block").addClass("hidden");
    $(".js__success-message ").addClass("show");
  };

  let error = () => {
    $(".js__email").addClass("error-color");
    $(".js__error-message").addClass("show");
  };

  //Проверка почты и её отправка либо выведение ошибки
  function validate() {
    let email = $(".js__email").val();
    if (validateEmail(email)) {
      sendForm();
      return false;
    } else {
      error();
      return false;
    }
  }
}
