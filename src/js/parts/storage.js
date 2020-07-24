export default function storage() {
  email.value = localStorage.getItem("email");
  email.oninput = () => {
    localStorage.setItem("email", email.value);
  };
}
