class Card {
  constructor(cardBtn, number, flip) {
    this.cardBtn = cardBtn;
    this.number = number;
    this.flip = flip;
    this.elementListener();
    this.open = false;
    this.disabled = false;
    this.success = false;
  }

  elementListener() {
    this.cardBtn.addEventListener("click", (event) => {
      if (event._eventDisabledClick) return;
      this.flip(this);
    });
  }

  set open(value) {
    this._open = value;

    if (this._open) {
      this.cardBtn.style.transform = "rotateY(0deg)";
      this.cardBtn.textContent = this.number;
    } else {
      this.cardBtn.style.transform = "rotateY(-180deg)";
      this.cardBtn.textContent = "";
    }
  }

  get open() {
    return this._open;
  }

  set disabled(value) {
    this._disable = value;

    if (this._disable) {
      this.cardBtn.style.cursor = "not-allowed";
      this.cardBtn.disabled = true;
    } else {
      this.cardBtn.style.cursor = "pointer";
      this.cardBtn.disabled = false;
    }
  }

  get disabled() {
    return this._disable;
  }

  set success(value) {
    this._success = value;
    if (this._success) {
      this.cardBtn.classList.add("list__btn_success");
    }
  }

  get success() {
    return this._success;
  }
}

export default class AmazingCard extends Card {
  set number(value) {
    this._number = value;

    const img = document.createElement("img");
    img.classList.add("list__img");
    img.src = `img/${value}.jpg`;
    img.alt = `Карточка ${value}`;
    img.addEventListener("error", () => {
      img.src = `img/default.png`;
      throw new Error("Изображение не загрузилось");
    });

    this.cardBtn.append(img);
  }

  get number() {
    return this._number;
  }

  set open(value) {
    this._open = value;

    if (this._open) {
      this.cardBtn.style.transform = "rotateY(0deg)";
    } else {
      this.cardBtn.style.transform = "rotateY(-180deg)";
    }
  }

  get open() {
    return this._open;
  }
}
