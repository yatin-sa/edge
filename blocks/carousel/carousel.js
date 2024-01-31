export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = "slide";
  });

  const slider = document.querySelector(".carousel");
  let currentSlide = 0;
  const leftButton = document.createElement("button");
  slider.append(leftButton);
  leftButton.classList.add("slider__btn");
  leftButton.classList.add("slider__btn--left");
  leftButton.innerHTML = `&larr;`;
  const rightButton = document.createElement("button");
  slider.append(rightButton);
  rightButton.classList.add("slider__btn");
  rightButton.classList.add("slider__btn--right");
  rightButton.innerHTML = `&rarr;`;

  const slides = document.querySelectorAll(".slide");
  const totalSlide = slides.length;
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  goToSlide(0);
  rightButton.addEventListener("click", function () {
    if (currentSlide == totalSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  });
  leftButton.addEventListener("click", function () {
    if (currentSlide == 0) {
      currentSlide = totalSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  });
}
