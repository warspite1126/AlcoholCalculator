"use strict";

const drinks = document.querySelector("#drinks");

function showTotalABV(e) {
  const total = document.querySelector("footer > h1");
  const drinksABV = document.querySelectorAll(".drinkPureAbvSpan");
  const pureAbv = () => {
    let i=0;
    drinksABV.forEach((e) => {
      i += parseFloat(e.textContent);
    });
    return i.toFixed(1);
  };

  total.textContent = `総アルコール量: ${pureAbv()}g`;
}

function addDrink() {
  const drink = document.createElement("div");
  drink.id = "addDrink";
  drink.className = "drink addDrink";

  const drink_span = document.createElement("span");
  drink_span.insertAdjacentText("beforeend", "+");
  drink.insertAdjacentElement("beforeend", drink_span);

  drinks.insertAdjacentElement("beforeend", drink);
}

function add(abvE, sizeE) {
  // ドリンクを追加する
  const abv = Number(abvE);
  const size = Number(sizeE);
  const drink = document.createElement("div");
  const drinkCount = document.querySelector(".drink").parentNode
    .childElementCount;

  drink.id = `drink${drinkCount}`;
  drink.className = `drink ${drinkColour(abv, size)}`;

  const drinkPureAbvSpanDiv = document.createElement("div");
  const drinkPureAbvSpan = document.createElement("span");
  const abvSizeDiv = document.createElement("div");
  const abvSpan = document.createElement("span");
  const sizeSpan = document.createElement("span");

  drinkPureAbvSpan.className = "drinkPureAbvSpan";
  drinkPureAbvSpanDiv.className = "drinkPureAbvSpanDiv";
  abvSizeDiv.className = "drinkAbvSizeDiv";

  abvSpan.insertAdjacentText("beforeend", `${abv}%`);
  sizeSpan.insertAdjacentText("beforeend", `${size}ml`);
  abvSizeDiv.insertAdjacentElement("beforeend", abvSpan);
  abvSizeDiv.insertAdjacentElement("beforeend", sizeSpan);

  const pureAbv = Math.round(abv * (size / 100) * 0.8 * 10) / 10;

  drinkPureAbvSpan.insertAdjacentText("beforeend", `${pureAbv}g`);
  drinkPureAbvSpanDiv.insertAdjacentElement("beforeend", drinkPureAbvSpan);
  drinkPureAbvSpanDiv.insertAdjacentElement("beforeend", abvSizeDiv);
  drink.insertAdjacentElement("beforeend", drinkPureAbvSpanDiv);

  drinks.insertAdjacentElement("afterbegin", drink);
  showTotalABV(pureAbv);
  modal();
}

function addButton() {
  const abv = document.querySelector("#abv");
  const size = document.querySelector("#size");
  if (abv.value == "" || size.value == false) {
    window.alert("入力してください。");
    return;
  }
  add(abv.value, size.value);
}

function modal() {
  const modal = document.querySelector("#modal");
  switch (modal.classList.value) {
    case "": // 最初の表示
      modal.className = "showModal";
      break;
    case "showModal": //最初に開いた後の非表示
      modal.className = "hiddenModal";
      break;
    case "hiddenModal":
      modal.className = "showModal";
      break;
  }
}

function drinkColour(abv, size) {
  const pureAbv = abv * (size / 100) * 0.8;
  if (pureAbv < 10) return "lv1";
  if (pureAbv <= 20) return "lv3";
  return "lv5";
}

function initialise() {
  addDrink();
}

initialise();

document.querySelector("#addDrink").addEventListener("click", modal);
document.querySelector("#addButton").addEventListener("click", addButton);
