import flatpickr from "flatpickr";

const datePickers = document.querySelector(".date-picker");

flatpickr(datePickers, {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});

const button = document.querySelector(".toggle-darkmode");
const body = document.body;

button.addEventListener("click", (event) => {
  body.classList.toggle("dark-mode");
});
