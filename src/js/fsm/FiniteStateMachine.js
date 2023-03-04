export class FiniteStateMachine {
    constructor() {
        this.states = {};
        this.currentState = null;
    }
    _AddState(name, state) {
        this.states[name] = state;
    }
    SetState(name) {
        const prevState = this.currentState;
        if (prevState) {
            if (prevState.Name == name) {
                return;
            }
            prevState.Exit();
        }
        const state = new this.states[name](this);
        this.currentState = state;
        state.Enter(prevState);
    }
    Update(timeElapsed, controller) {
        if (this.currentState) {
            this.currentState.Update(timeElapsed, controller);
        }
    }
}
