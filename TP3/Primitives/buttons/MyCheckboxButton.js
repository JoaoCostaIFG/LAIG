class MyCheckboxButton extends MyButton {
  // TODO colors
  constructor(scene, text, altText, onClickFunc) {
    super(scene, text, onClickFunc);

    this.text = text;
    this.altText = altText;
    this.clicked = false;

    // buttons should be sized around the largest element
    if (this.altText.length > this.text.length)
      this.setButtonLenFromText(altText);
  }

  onClick() {
    super.onClick();

    if (this.clicked) this.txt.setText(this.text);
    else this.txt.setText(this.altText);
    this.clicked = !this.clicked;
  }

  isClicked() {
    return this.clicked;
  }
}
