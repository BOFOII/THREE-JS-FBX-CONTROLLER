import { IdleState } from "../states/player/IdleState.js";
import { RunState } from "../states/player/RunState.js";
import { WalkState } from "../states/player/WalkState.js";
import { FiniteStateMachine } from "./FiniteStateMachine.js";
export class PlayerFSM extends FiniteStateMachine {
    constructor(animations) {
        super();
        this.animations = animations;
        this._RegisterState();
    }
    _RegisterState() {
        this._AddState('idle', IdleState);
        this._AddState('walk', WalkState);
        this._AddState('run', RunState);
    }
}
