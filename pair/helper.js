import { game } from "./index.js";
import { PADDING_CONTAINER, GAP, createError } from "./page.js";
import {
  createGameBox,
  renderItem,
  createRestartBtn,
  createLoseTimeSpan,
} from "./game-render.js";
import { gameLogic } from "./game-logic.js";
import Card from "./class-card.js";

export function createNumbersArray(count) {
  const createArray = [];

  for (let i = 1; i <= count; i++) {
    createArray.push(i, i);
  }

  return createArray;
}

export function shuffleNumbersArray(arr) {
  for (const i in arr) {
    const j = Math.round(Math.random() * (arr.length - 1)),
      temp = arr[i];

    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}

export function calcResizeCard(numberOfRows) {
  if (typeof numberOfRows !== "number") {
    throw new TypeError("Аргумент должен быть числом");
  }
  const minBrowserWidth = 322;

  let browserWidth = window.innerWidth;

  if (browserWidth < minBrowserWidth) browserWidth = 320;

  let cardWidth =
    (browserWidth - PADDING_CONTAINER * 2 - (numberOfRows - 1) * GAP) /
    numberOfRows;

  const maxCardWidth = 80;

  if (cardWidth > maxCardWidth) cardWidth = maxCardWidth;

  return {
    cardWidth,
    cardHeight: cardWidth,
    listWidth: cardWidth * numberOfRows + (numberOfRows - 1) * GAP,
    fontSize: (60 * cardWidth) / 100,
  };
}

function testValidNumber(number) {
  if (typeof number !== "number") {
    throw new TypeError("Должно быть числом");
  }

  if (number % 2 !== 0 || number < 2 || number > 10) {
    throw new TypeError("Должно быть чётным числом от 2 до 10, включительно");
  }
}

export function formValidation(event, label) {
  event.preventDefault();

  const inputValue = Number(event.currentTarget.elements[0].value.trim());

  try {
    testValidNumber(inputValue);
  } catch (error) {
    createError(label, { message: error.message });
    return;
  }

  game.numberOfRows = inputValue;

  startGame({ gameObj: game });
}

export function startGame({ gameObj }) {
  testValidNumber(gameObj.numberOfRows);
  gameObj.cards = [];
  gameObj.count = 0;
  gameObj.time = 60;
  gameObj.numberOfPairs = gameObj.numberOfRows ** 2 / 2;

  clearInterval(game.timer);

  const numbersArray = shuffleNumbersArray(
      createNumbersArray(gameObj.numberOfPairs)
    ),
    resizeCard = calcResizeCard(gameObj.numberOfRows),
    gameBox = createGameBox({
      listWidth: resizeCard.listWidth,
      fontSize: resizeCard.fontSize,
    });

  for (const number of numbersArray) {
    const item = renderItem({
      cardWidth: resizeCard.cardWidth,
      cardHeight: resizeCard.cardHeight,
    });

    gameObj.cards.push(new Card(item.cardBtn, number, gameLogic));

    gameBox.list.append(item.li);
  }

  timer();
}

export function allCardsDisabled(cardsArr) {
  cardsArr.forEach((card) => {
    card.disabled = true;
  });
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function eventDisabledSpaceAndEnter(event) {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
  }
}

function eventDisabledClick(event) {
  event._eventDisabledClick = true;
}

export function windowDisabledClickSpaceAndEnter() {
  window.addEventListener("keydown", eventDisabledSpaceAndEnter);
  window.addEventListener("click", eventDisabledClick, true);
}

export function windowEnabledClickSpaceAndEnter() {
  window.removeEventListener("keydown", eventDisabledSpaceAndEnter);
  window.removeEventListener("click", eventDisabledClick, true);
}

export function eventRestartBtn() {
  startGame({ gameObj: game });
}

function timer() {
  const blockTimer = document.getElementById("timer"),
    oneSecond = 1000;

  game.timer = setInterval(() => {
    if (game.time === 0) {
      loseGame();
      return;
    }
    blockTimer.innerHTML = `До конца игры: <span class = "game__time">${--game.time}</span>c`;
  }, oneSecond);
}

function loseGame() {
  clearInterval(game.timer);
  allCardsDisabled(game.cards);
  createLoseTimeSpan();
  createRestartBtn();
}
