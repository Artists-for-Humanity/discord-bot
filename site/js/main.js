import flatpickr from "flatpickr";
console.log("This runs in the browser");
const button = document.querySelector('.toggle-darkmode');
const body = document.body;

button.addEventListener('click', event => {
  body.classList.toggle("dark-mode");
});
// If using flatpickr in a framework, its recommended to pass the element directly
const datePickers = document.querySelector(".date-picker")

flatpickr(datePickers, {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});