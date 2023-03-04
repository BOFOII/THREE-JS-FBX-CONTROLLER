export class KeyboardController {
    constructor() {
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.pressedShift = false;
        this._Init();
    }
    _Init() {
        document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }
    _onKeyDown(event) {
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
    _onKeyUp(event) {
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
