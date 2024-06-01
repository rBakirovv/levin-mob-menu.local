window.addEventListener("DOMContentLoaded", function () {
  const accordionsHeads = document.querySelectorAll(".accordion-head");

  accordionsHeads && accordionsHeads.forEach((accordionHead) => {
    accordionHead.addEventListener("click", () => {
      accordionHead.parentNode.classList.toggle("accordion-item_active");
    })
  })
})