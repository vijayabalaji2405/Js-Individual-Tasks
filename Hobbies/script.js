const inputField = document.querySelector(".search-field");
const answer = document.querySelector(".final");
const answer2 = document.querySelector(".final2");
const btn = document.querySelector(".btn");
const addName = document.querySelector(".search-fieldName");
const addHobbie = document.querySelector(".search-fieldHobbie");
const btn2 = document.querySelector(".btn2");

let hobbies = {
  Steve: ["Fashion", "Piano", "Reading"],
  Patty: ["Drama", "Magic", "Pets"],
  Chad: ["Puzzles", "Pets", "Yoga"],
};

btn.addEventListener("click", () => {
  const inputs = inputField.value;
  const finalResult = findAllHobbyists(inputs, hobbies);
  answer.textContent = finalResult;
  clear();
});

const findAllHobbyists = function (hobbie, obj) {
  let finals = [];
  let err = "Please enter a valid input";
  if (hobbie === "") return err;
  const names = Object.keys(obj);
  for (i = 0; i < names.length; i++) {
    if (obj[names[i]].find((e) => e == hobbie)) {
      finals.push(names[i]);
    }
  }
  if (finals !== "") {
    return finals;
  } else {
    return err;
  }
};
const clear = function () {
  inputField.value = "";
};
const clearingTable = function () {
  answer.textContent = "";
};
