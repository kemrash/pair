import { createPage } from "./page.js";
import { createResizeCard } from "./game-render.js";
import { calcResizeCard } from "./helper.js";

createPage();

export const game = {
  numberOfRows: 4,
  waitTime: 350,
};

window.addEventListener("resize", () => {
  createResizeCard(calcResizeCard(game.numberOfRows));
});
