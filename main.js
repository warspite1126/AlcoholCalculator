"use strict";

const drinks = document.querySelector("#drinks");

function addDrink() {
  const drink = document.createElement("div");
  drink.id = "addDrink";
  drink.className = "drink addDrink"

  const drink_span = document.createElement("span");
  drink_span.insertAdjacentText("beforeend","+");
  drink.insertAdjacentElement("beforeend",drink_span)

  drinks.insertAdjacentElement("beforeend", drink);
}

function add(advE, sizeE) {
  const adv = Number(advE);
  const size = Number(sizeE);
  const drink = document.createElement("div");
  const drinkCount = document.querySelector(".drink").parentNode
    .childElementCount;

  drink.id = `drink${drinkCount}`;
  drink.className = `drink ${drinkColour(adv, size)}`;

  drinks.insertAdjacentElement("afterbegin", drink);
  modal();
}

function addButton() {
  const adv = document.querySelector("#adv");
  const size = document.querySelector("#size");
  if (adv.value == "" || size.value == false) {
    window.alert("入力してください。");
    return;
  }
  add(adv.value, size.value)
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

function drinkColour(adv, size) {
  const pureAdv = adv * (size / 100) * 0.8;
  if (pureAdv < 10) return "lv1";
  if (pureAdv <= 20) return "lv3";
  return "lv5"
}

function initialise() {
  addDrink();
}

initialise();

document.querySelector("#addDrink").addEventListener("click", modal);
document.querySelector("#addButton").addEventListener("click", addButton);
