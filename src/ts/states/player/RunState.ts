import { PlayerFSM } from "../../fsm/PlayerFSM.js";
import { KeyboardController } from "../../KeyboardController";
import { State } from "../State.js";

export class RunState extends State {

  constructor(playerFSM: PlayerFSM) {
    super(playerFSM);
  }

  get Name() {
    return 'run';
  }

  Enter(prevState: any) {
    const curAction = this.parent.animations['run'].action;
    if (prevState) {
      const prevAction = this.parent.animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed: number, controller: KeyboardController) {
    if (controller.moveForward || controller.moveForward) {
      if (!controller.pressedShift) {
        this.parent.SetState('walk');
      }
      return;
    }

    this.parent.SetState('idle');
  }

}