import { KeyboardController } from "../KeyboardController.js";
import { State } from "../states/State.js";

export class FiniteStateMachine {

  states: { [key: string]: any } = {};
  currentState: any = null;

  constructor() {
  }

  _AddState(name: string, state: any) {
    this.states[name] = state;
  }

  SetState(name: string) {
    const prevState = this.currentState;
    if(prevState) {
      if(prevState.Name == name) {
        return;
      }
      prevState.Exit();
    }

    const state = new this.states[name](this);
    this.currentState = state;
    state.Enter(prevState);
  }

  Update(timeElapsed: number, controller: KeyboardController) {
    if (this.currentState) {
      this.currentState.Update(timeElapsed, controller);
    }
  }
}