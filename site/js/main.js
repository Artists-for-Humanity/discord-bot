import flatpickr from "flatpickr";

flatpickr(".date-picker", {
  dateFormat: "Y-m-d H:i",
});

flatpickr(".date-and-time-picker", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});

const button = document.querySelector(".toggle-darkmode");
const body = document.body;

button.addEventListener("click", (event) => {
  body.classList.toggle("dark-mode");
});
