const inputField = document.querySelector(".search-field");
const answer = document.querySelector(".final");
const btn = document.querySelector(".btn");
let codeToValidate = "";
btn.addEventListener("click", () => {
  codeToValidate = inputField.value;
  const arr = Array.from(codeToValidate);
  const filtered = arr.filter(
    (e) =>
      e === "{" ||
      e === "[" ||
      e === "]" ||
      e === "(" ||
      e === ")" ||
      e === "{" ||
      e === "}"
  );
  const returnedValue = checkingBrac(filtered);
  if (returnedValue) {
    answer.innerHTML = "True";
  } else {
    answer.innerHTML = "False";
  }
});
const checkingBrac = function (codes) {
  let codess = [...codes];
  let final;
  const fore = codes.forEach((code, index) => {
    if (code === "]") {
      const indexs = codess.indexOf("]");
      if (codess[indexs - 1] == "[") {
        codess.splice(indexs - 1, 2);
        final = true;
      } else {
        final = false;
      }
    }
    if (code === "}") {
      const indexs = codess.indexOf("}");
      if (codess[indexs - 1] == "{") {
        codess.splice(indexs - 1, 2);
        final = true;
      } else {
        final = false;
      }
    }
    if (code === ")") {
      const indexs = codess.indexOf(")");
      if (codess[indexs - 1] == "(") {
        codess.splice(indexs - 1, 2);
        final = true;
      } else {
        final = false;
      }
    }
  });
  if (codess == "") {
    final = true;
  } else {
    final = false;
  }
  return final;
};
