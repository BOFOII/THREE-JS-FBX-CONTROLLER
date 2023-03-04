import { AnimationMixer, LoadingManager, Object3D, PerspectiveCamera, Quaternion, Scene, Vector3 } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PlayerFSM } from '../fsm/PlayerFSM.js';
import { Entity } from './Entity.js';

export class Player extends Entity {

  constructor(path: string, name: string, scene: Scene, camera: PerspectiveCamera, animations: { [key: string]: string }) {
    super(path, name, scene, camera, animations);
    this.stateMachine = new PlayerFSM(this.loadedAnimation);
    this._loadModel();
  }
  
  Update(timeInSeconds: number) {
    if (!this.model) {
      return;
    }

    this.stateMachine?.Update(timeInSeconds, this.controller);

    const velocity = this.velocity;
    const frameDecceleration = new Vector3(
        velocity.x * this.decceleration.x,
        velocity.y * this.decceleration.y,
        velocity.z * this.decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this.model;
    const _Q = new Quaternion();
    const _A = new Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this.acceleration.clone();
    if (this.controller.pressedShift) {
      acc.multiplyScalar(2.0);
    }

    if (this.stateMachine?.currentState?.Name == 'dance') {
      acc.multiplyScalar(0.0);
    }

    if (this.controller.moveForward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this.controller.moveBackward) {
      velocity.z -= acc.z * timeInSeconds;
    }
    if (this.controller.moveLeft) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this.acceleration.y);
      _R.multiply(_Q);
    }
    if (this.controller.moveRight) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this.acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    oldPosition.copy(controlObject.position);
    
    if (this.mixers) {
      this.mixers.update(timeInSeconds);
    }
  }
}