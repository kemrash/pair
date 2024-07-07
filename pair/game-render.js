import { GAP } from "./page.js";
import { eventRestartBtn } from "./helper.js";
import { game } from "./index.js";

export function createGameBox({ listWidth, fontSize }) {
  const gameContainer = document.querySelector(".game__container"),
    gameSubtitle = document.createElement("h2"),
    timeBox = document.createElement("div"),
    wrap = document.createElement("div"),
    list = document.createElement("ul"),
    textAria = document.createElement("div");

  gameContainer.innerHTML = "";

  gameSubtitle.classList.add("visually-hidden");
  gameSubtitle.classList.add("subtitle");
  gameSubtitle.textContent = "Начали";

  timeBox.classList.add("game__timer");
  timeBox.id = "timer";
  timeBox.setAttribute("aria-hidden", "true");
  timeBox.innerHTML = `До конца игры: <span class = "game__time">${game.time}</span>c`;

  wrap.classList.add("game__wrap");
  wrap.setAttribute("aria-live", "polite");

  list.classList.add("list-reset");
  list.classList.add("list");
  list.style.gap = `${GAP}px`;
  list.style.width = `${listWidth}px`;
  list.style.fontSize = `${fontSize}px`;

  textAria.classList.add("game__text");
  textAria.classList.add("visually-hidden");

  wrap.append(list);
  wrap.append(textAria);
  gameContainer.append(gameSubtitle);
  gameContainer.append(timeBox);
  gameContainer.append(wrap);

  return {
    timeBox,
    list,
  };
}

export function renderItem({ cardWidth, cardHeight }) {
  const li = document.createElement("li"),
    cardBtn = document.createElement("button");

  li.classList.add("list__item");
  li.style.width = `${cardWidth}px`;
  li.style.minHeight = `${cardHeight}px`;

  cardBtn.classList.add("btn-reset");
  cardBtn.classList.add("list__btn");
  cardBtn.ariaLabel = "Карточка";

  li.append(cardBtn);

  return {
    li,
    cardBtn,
  };
}

export function createResizeCard({
  cardWidth,
  cardHeight,
  listWidth,
  fontSize,
}) {
  const resizeList = document.querySelector(".list"),
    resizeItem = document.querySelectorAll(".list__item");

  resizeItem.forEach((element) => {
    element.style.width = `${cardWidth}px`;
    element.style.minHeight = `${cardHeight}px`;
  });

  resizeList.style.width = `${listWidth}px`;
  resizeList.style.fontSize = `${fontSize}px`;
}

export function createRestartBtn() {
  const wraper = document.querySelector(".game__wrap");

  if (!wraper) return;

  const createBtn = document.createElement("button");
  createBtn.classList.add("btn-reset");
  createBtn.classList.add("btn");
  createBtn.classList.add("game__btn");
  createBtn.textContent = "Сыграть ещё раз";

  createBtn.addEventListener("click", eventRestartBtn);

  wraper.after(createBtn);
}

export function createLoseTimeSpan() {
  const gameWrapDiv = document.querySelector(".game__wrap");

  if (gameWrapDiv) {
    const loseTimeSpan = document.createElement("span");
    loseTimeSpan.classList.add("game__span");
    loseTimeSpan.textContent = "Время вышло";

    gameWrapDiv.append(loseTimeSpan);
  }
}
