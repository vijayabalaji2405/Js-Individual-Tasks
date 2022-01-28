const from = document.querySelector(".from");
const to = document.querySelector(".to");
const inputValue = document.querySelector(".value_input");
const fromOption = document.querySelector(".fromclass");
const toOption = document.querySelector(".toclass");
const btn = document.querySelector(".btn");
const final = document.querySelector(".final");
const API = "68178ba6d39c9cc0293e8727bb29b8f0";

let selectFrom;
let selectTo;
let inputsValue;
from.addEventListener("change", (e) => {
  selectFrom = e.target.value;
});

to.addEventListener("change", (e) => {
  selectTo = e.target.value;
});

btn.addEventListener("click", () => {
  search(selectFrom, selectTo);
  if (inputValue.value !== "") {
    inputsValue = inputValue.value;
  } else {
    final.textContent = "Please Input a value";
  }
});
const getSupported = async function () {
  const getting = await fetch(
    `http://api.currencylayer.com/list?access_key=${API}`
  );
  const data = await getting.json();
  fetchingFrom(data.currencies);
};
getSupported();

const fetchingFrom = function (data) {
  let createFrom = "";
  Object.keys(data).forEach((e, index) => {
    createFrom += `<option value = '${e}'>${data[e]}</option>`;
  });
  from.insertAdjacentHTML("beforeend", createFrom);
  to.insertAdjacentHTML("beforeend", createFrom);
};

const search = async function (from, to) {
  if (from && to) {
    const sending = await fetch(
      `https://v6.exchangerate-api.com/v6/2d0e548ecb8d80c5f5c6f30c/latest/${from}`
    );
    const data = await sending.json();
    const amount = data.conversion_rates[to];
    math(inputsValue, amount, to);
  } else {
    final.textContent = `Please select a country`;
  }
};

const math = function (amout, totransfer, transfered) {
  const transfer = amout * totransfer;
  final.textContent = `Converted: ${transfer} ${transfered}`;
  clear();
};
const clear = function () {
  inputValue.value = "";
};
