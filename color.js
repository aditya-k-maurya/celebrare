document.addEventListener("DOMContentLoaded", () => {
  const demoColor = document.querySelector(".demo-color");
  const demoColorOptions = document.querySelector(".demo-color-options");
  const colorOptions = document.querySelectorAll(".demo-color-option");

  // Toggle visibility 
  demoColor.addEventListener("click", () => {
    const isVisible = getComputedStyle(demoColorOptions).display === "flex";
    demoColorOptions.style.display = isVisible ? "none" : "flex";
  });

  // Update the background color of demo-color when a color option is clicked
  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedColor = option.getAttribute("value");
      demoColor.style.backgroundColor = selectedColor;
      demoColorOptions.style.display = "none";
    });
  });
});
