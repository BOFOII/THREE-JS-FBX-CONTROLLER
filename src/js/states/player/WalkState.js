import { State } from "../State.js";
export class WalkState extends State {
    constructor(playerFSM) {
        super(playerFSM);
    }
    get Name() {
        return "walk";
    }
    Enter(prevState) {
        const curAction = this.parent.animations['walk'].action;
        if (prevState) {
            const prevAction = this.parent.animations[prevState.Name].action;
            curAction.enabled = true;
            if (prevState.Name == 'run') {
                const ratio = curAction.getClip().duration / prevAction.getClip().duration;
                curAction.time = prevAction.time * ratio;
            }
            else {
                curAction.time = 0.0;
                curAction.setEffectiveTimeScale(1.0);
                curAction.setEffectiveWeight(1.0);
            }
            curAction.crossFadeFrom(prevAction, 0.5, true);
            curAction.play();
        }
        else {
            curAction.play();
        }
    }
    Update(timeElapsed, controller) {
        if (controller.moveForward) {
            if (controller.pressedShift) {
                this.parent.SetState('run');
            }
            return;
        }
        if (controller.moveBackward) {
            return;
        }
        this.parent.SetState('idle');
    }
}
