import { PlayerFSM } from "../../fsm/PlayerFSM.js";
import { KeyboardController } from "../../KeyboardController.js";
import { State } from "../State.js"

export class IdleState extends State {

  constructor(playerFSM: PlayerFSM) {
    super(playerFSM);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState: any) {
    const idleAction = this.parent.animations['idle'].action;
    if (prevState) {
      const prevAction = this.parent.animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed: number, controller: KeyboardController) {
    if(controller.moveForward || controller.moveBackward) {
      this.parent.SetState('walk');
    }
  }
}