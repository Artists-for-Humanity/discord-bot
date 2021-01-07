import flatpickr from "flatpickr";

const datePickers = document.querySelector(".date-picker");

flatpickr(datePickers, {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});
