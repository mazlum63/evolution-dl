export class Movement {
  public forward: boolean = false;
  public left: boolean = false;
  public right: boolean = false;
  public reverse: boolean = false;
  constructor(isUser: boolean = false) {
    if (isUser) {
      this.addKeyboardListeners();
    }
  }

  private addKeyboardListeners() {
    document.onkeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "a":
          this.left = true;
          break;
        case "d":
          this.right = true;
          break;
        case "w":
          this.forward = true;
          break;
        case "s":
          this.reverse = true;
          break;
      }
    };

    document.onkeyup = (event: KeyboardEvent) => {
      switch (event.key) {
        case "a":
          this.left = false;
          break;
        case "d":
          this.right = false;
          break;
        case "w":
          this.forward = false;
          break;
        case "s":
          this.reverse = false;
          break;
      }
    };
  }
}
