console.log("This runs in the browser");
const button = document.querySelector(".toggle-darkmode");
const body = document.body;

button.addEventListener("click", (event) => {
  body.classList.toggle("dark-mode");
});
