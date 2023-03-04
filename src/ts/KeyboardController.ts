export class KeyboardController {

  moveForward: boolean = false;
  moveBackward: boolean = false;
  moveLeft: boolean = false;
  moveRight: boolean = false;
  pressedShift: boolean = false;

  constructor() {
    this._Init();
  }

  _Init() {
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event: any) {
    switch (event.keyCode) {
      case 87: // w
        this.moveForward = true;
        break;
      case 65: // a
        this.moveLeft = true;
        break;
      case 83: // s
        this.moveBackward = true;
        break;
      case 68: // d
        this.moveRight = true;
        break;
      case 16: // SHIFT
        this.pressedShift = true;
        break;
    }
  }

  _onKeyUp(event: any) {
    switch (event.keyCode) {
      case 87: // w
        this.moveForward = false;
        break;
      case 65: // a
        this.moveLeft = false;
        break;
      case 83: // s
        this.moveBackward = false;
        break;
      case 68: // d
        this.moveRight = false;
        break;
      case 16: // SHIFT
        this.pressedShift = false;
        break;
    }
  }
}