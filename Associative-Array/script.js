const inputField = document.querySelector(".search-field");
const table = document.querySelector(".table");
const body = document.querySelector("#body-part");
const head = document.querySelector("#table-head");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  if (inputField.value === "") return;
  const converted = validate(inputField.value);
  const keys = Object.keys(converted);
  const values = Object.values(converted);
  table.classList.remove("hidden");
  const tableHead = document.createElement("tr");
  tableHead.innerHTML = `
  <th>Words</th>
  <th>Count</th>
  `;
  head.appendChild(tableHead);
  for (let i = 0; i < keys.length; i++) {
    const tableBody = document.createElement("tr");
    tableBody.innerHTML = `
  <td>${keys[i]}</td>
  <td>${values[i]}</td>`;
    body.appendChild(tableBody);
  }
  clear();
});
const clear = function () {
  inputField.value = "";
};
const validate = function (input) {
  const converting = input.toLocaleLowerCase();
  const convertedArr = converting
    .replace(/[,\.[()!@#$%^&*~`""''?/\]{}&]+/g, "")
    .split(" ");
  let objectArr = {};
  for (let i = 0; i < convertedArr.length; i++) {
    if (objectArr[convertedArr[i]] === undefined) {
      objectArr[convertedArr[i]] = 1;
    } else {
      objectArr[convertedArr[i]]++;
    }
  }
  return objectArr;
};
const clearingTable = function () {
  table.classList.add("hidden");
  body.innerText = "";
  head.innerText = "";
};
