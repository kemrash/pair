import { formValidation } from "./helper.js";

export const PADDING_CONTAINER = 5;
export const GAP = 2;

function createContainer() {
  const addContainer = document.createElement("div");
  addContainer.classList.add("container");
  addContainer.style.padding = `0 ${PADDING_CONTAINER}px`;

  return addContainer;
}

function createHeader() {
  const createHeader = document.createElement("header"),
    createHeaderContainer = createContainer(),
    createHeaderTitle = document.createElement("h1"),
    createHeaderForm = createSettingsForm();

  createHeader.classList.add("header");
  createHeaderContainer.classList.add("header__container");
  createHeaderTitle.classList.add("header__title");
  createHeaderTitle.textContent = "Игра в пары";

  createHeaderContainer.append(createHeaderTitle);
  createHeaderContainer.append(createHeaderForm);
  createHeader.append(createHeaderContainer);

  return createHeader;
}

function createSettingsForm() {
  const fieldset = document.createElement("fieldset"),
    form = document.createElement("form"),
    label = document.createElement("label"),
    span = document.createElement("span"),
    input = document.createElement("input"),
    startButton = document.createElement("button");

  fieldset.classList.add("fieldset-reset");
  fieldset.classList.add("header__fieldset");
  form.classList.add("header__form");
  label.classList.add("header__label");
  span.classList.add("header__span");
  input.classList.add("header__input");

  form.noValidate = true;

  span.textContent = "Количество карточек по вертикали/горизонтали";
  input.placeholder = 4;
  input.title = "Доступны чётные цифры от 2 до 10.";
  input.name = "set-row-col";
  input.type = "number";
  input.min = 2;
  input.max = 10;
  input.step = 2;
  input.value = 4;

  startButton.classList.add("btn-reset");
  startButton.classList.add("btn");
  startButton.classList.add("header__btn");

  startButton.textContent = "Начать игру";

  form.addEventListener("submit", {});

  label.append(span);
  label.append(input);
  form.append(label);
  form.append(startButton);
  fieldset.append(form);

  form.addEventListener("submit", (event) => {
    const errorDesc = document.getElementById("error");

    if (errorDesc) {
      errorDesc.remove();
    }

    formValidation(event, label);
  });

  return fieldset;
}

function createRules() {
  const createRules = document.createElement("section"),
    createRulesContainer = createContainer(),
    createRulesSubtitle = document.createElement("h2"),
    createRulesText = document.createElement("p");

  createRules.classList.add("rules");
  createRulesSubtitle.classList.add("subtitle");
  createRulesSubtitle.textContent = "Правила";
  createRulesText.classList.add("text-reset");
  createRulesText.classList.add("rules__text");
  createRulesText.textContent =
    "Игрок открывает сначала одну карточку, затем вторую. Если открытые карточки одинаковы, они остаются открытыми до конца партии. " +
    "В противном случае они переворачиваются обратно. Перед игрой можно выбрать количество карточек на поле. Для этого в поле " +
    "«Количество карточек по вертикали/горизонтали» нужно ввести число и нажать кнопку «Начать игру». В поле можно ввести чётное " +
    "число от 2 до 10. У игрока есть минута, по истечении которой игра сразу завершается, даже если ещё не открыты все карточки.";

  createRulesContainer.append(createRulesSubtitle);
  createRulesContainer.append(createRulesText);
  createRules.append(createRulesContainer);

  return createRules;
}

export function createPage() {
  const header = createHeader(),
    main = document.createElement("main"),
    game = document.createElement("section"),
    containerGame = createContainer(),
    rules = createRules();

  game.classList.add("game");
  containerGame.classList.add("game__container");

  containerGame.id = "game";

  game.append(containerGame);
  main.append(game);
  main.append(rules);
  document.body.append(header, main);
}

export function createError(input, { message }) {
  if (!message) {
    throw new Error("Нет сообщения об ошибке");
  }
  let errorDesc = document.getElementById("error");

  if (!errorDesc) {
    errorDesc = document.createElement("span");
    errorDesc.classList.add("header__error");
    errorDesc.id = "error";

    input.after(errorDesc);
  }

  errorDesc.textContent = message;
}
