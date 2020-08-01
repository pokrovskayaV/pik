export default function storage() {
  try {
  email.value = localStorage.getItem("email");
  email.oninput = () => {
  localStorage.setItem("email", email.value);
  }
} catch (e) {
  email.value='';
}
}
