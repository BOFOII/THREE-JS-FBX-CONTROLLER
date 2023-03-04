import { AnimationMixer, LoadingManager, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { FiniteStateMachine } from "../fsm/FiniteStateMachine.js";
import { KeyboardController } from "../KeyboardController.js";

export class Entity {

  path: string;
  name: string;
  scene: Scene;
  camera: PerspectiveCamera;
  decceleration: Vector3;
  acceleration: Vector3;
  velocity:Vector3;
  animations: { [key: string]: string } = {};
  controller: KeyboardController;
  stateMachine: FiniteStateMachine | null = null;
  model: Object3D | null = null;
  mixers: AnimationMixer | null = null;
  loadedAnimation: { [key: string]: object } = {};

  constructor(path: string, name: string, scene: Scene, camera: PerspectiveCamera, animations: { [key: string]: string }) {
    this.path = path;
    this.name = name;
    this.scene = scene;
    this.camera = camera;
    this.decceleration = new Vector3(-0.0005, -0.0001, -5.0);
    this.acceleration = new Vector3(1, 0.25, 50.0);
    this.velocity = new Vector3(0, 0, 0);
    this.animations = animations;
    this.controller = new KeyboardController();
  }

  _loadModel(...args: any[]) {
    const loader: FBXLoader = new FBXLoader();
    loader.setPath(this.path);
    loader.load(this.name, (model) => {
      model.scale.setScalar(0.1);
      model.traverse((c) => {
        c.castShadow = true;
      });


      this.model = model;
      this.scene.add(model);

      this.mixers = new AnimationMixer(this.model);

      const manager = new LoadingManager();
      manager.onLoad = () => {
        this.stateMachine?.SetState('idle');
        console.log("Semua file model berhasil di load");
      }

      const _AddAnimation = (name: string, model: Object3D) => {
        if (this.mixers == null) {
          return;
        }

        const clip = model.animations[0];
        const action = this.mixers.clipAction(clip);
        this.loadedAnimation[name] = {
          clip: clip,
          action: action,
        };

        console.log("Berhasil menambahkan animasi: " + name);
      }

      const loader: FBXLoader = new FBXLoader(manager);
      loader.setPath(this.path);
      for (let key in this.animations) {
        loader.load(this.animations[key], (animationModel) => { _AddAnimation(key, animationModel); });
      }
    });
  }

  Update(...args: any[]) {
  }
}