const rating = document.querySelector("#rating");
const spanTag = document.getElementsByTagName("span");
console.log(spanTag);

const adding = function () {
  for (i = 0; i < spanTag.length; i++) {
    spanTag[i].innerHTML = "";
    const span = (spanTag[i].innerHTML = `<i 
    id = ${i} class="far fa-star number"></i>`);
    spanTag[i].addEventListener("click", () => {});
  }
};
adding();
let numbers = [];
const spans = document.querySelectorAll(".number");

const filling = function (number) {
  for (i = 0; i <= number; i++) {
    spans[i].classList.remove("far");
    spans[i].classList.add("fa", "active");
  }
};

// filling();
spans.forEach((item) => {
  item.addEventListener("click", () => {
    for (i = 0; i < spans.length; i++) {
      spans[i].classList.remove("fa", "active");
      spans[i].classList.add("far");
    }
    const indexNumber = item.getAttribute("id");
    filling(indexNumber);
  });
});
