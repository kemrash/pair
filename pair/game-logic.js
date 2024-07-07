import { game } from "./index.js";
import {
  delay,
  windowDisabledClickSpaceAndEnter,
  windowEnabledClickSpaceAndEnter,
} from "./helper.js";
import { createRestartBtn } from "./game-render.js";

export async function gameLogic(card) {
  windowDisabledClickSpaceAndEnter();
  card.open = true;
  await delay(game.waitTime);

  for (const element of game.cards) {
    if (card !== element && element.open && card.number === element.number) {
      card.success = true;
      card.disabled = true;

      element.success = true;
      element.disabled = true;

      const numberOfCardsMatched = 2;

      game.count += numberOfCardsMatched;
    }

    if (
      card !== element &&
      element.open &&
      card.number !== element.number &&
      !card.success &&
      !element.success
    ) {
      card.open = false;
      element.open = false;
      await delay(game.waitTime);
    }
  }

  if (game.count === game.cards.length) {
    clearInterval(game.timer);
    createRestartBtn();
  }

  windowEnabledClickSpaceAndEnter();
}
