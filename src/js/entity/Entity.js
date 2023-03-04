import { AnimationMixer, LoadingManager, Vector3 } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { KeyboardController } from "../KeyboardController.js";
export class Entity {
    constructor(path, name, scene, camera, animations) {
        this.animations = {};
        this.stateMachine = null;
        this.model = null;
        this.mixers = null;
        this.loadedAnimation = {};
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
    _loadModel(...args) {
        const loader = new FBXLoader();
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
                var _a;
                (_a = this.stateMachine) === null || _a === void 0 ? void 0 : _a.SetState('idle');
                console.log("Semua file model berhasil di load");
            };
            const _AddAnimation = (name, model) => {
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
            };
            const loader = new FBXLoader(manager);
            loader.setPath(this.path);
            for (let key in this.animations) {
                loader.load(this.animations[key], (animationModel) => { _AddAnimation(key, animationModel); });
            }
        });
    }
    Update(...args) {
    }
}
