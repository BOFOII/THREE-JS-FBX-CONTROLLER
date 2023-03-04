import { AmbientLight, CubeTextureLoader, DirectionalLight, Mesh, MeshStandardMaterial, PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, Scene, sRGBEncoding, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Player } from "./entity/Player.js";
class Loader {
    constructor() {
        this.previousRAF = 0;
        this.character = null;
        this.threejs = new WebGLRenderer({
            antialias: true,
        });
        this.threejs.outputEncoding = sRGBEncoding;
        this.threejs.shadowMap.enabled = true;
        this.threejs.shadowMap.type = PCFSoftShadowMap;
        this.threejs.setPixelRatio(window.devicePixelRatio);
        this.threejs.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.threejs.domElement);
        window.addEventListener('resize', () => {
            this._OnWindowResize();
        }, false);
        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 1000.0;
        this.camera = new PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(25, 10, 25);
        this.scene = new Scene();
        let light = new DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(-100, 100, 100);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 4096;
        light.shadow.mapSize.height = 4096;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 50;
        light.shadow.camera.right = -50;
        light.shadow.camera.top = 50;
        light.shadow.camera.bottom = -50;
        this.scene.add(light);
        let light2 = new AmbientLight(0xFFFFFF, 0.25);
        this.scene.add(light2);
        const controls = new OrbitControls(this.camera, this.threejs.domElement);
        controls.target.set(0, 10, 0);
        controls.update();
        const loader = new CubeTextureLoader();
        const texture = loader.load([
            '../../resources/scene/posx.jpg',
            '../../resources/scene/negx.jpg',
            '../../resources/scene/posy.jpg',
            '../../resources/scene/negy.jpg',
            '../../resources/scene/posz.jpg',
            '../../resources/scene/negz.jpg',
        ]);
        texture.encoding = sRGBEncoding;
        this.scene.background = texture;
        const plane = new Mesh(new PlaneGeometry(100, 100, 10, 10), new MeshStandardMaterial({
            color: 0x808080,
        }));
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this.scene.add(plane);
        this._LoadAnimatedModel();
        this._RAF();
        console.log("ok2");
    }
    _LoadAnimatedModel() {
        let path = "../../resources/player/zombie/";
        let animations = {
            dance: 'dance.fbx',
            idle: 'idle.fbx',
            run: 'run.fbx',
            walk: 'walk.fbx'
        };
        this.character = new Player(path, 'mremireh_o_desbiens.fbx', this.scene, this.camera, animations);
    }
    _OnWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.threejs.setSize(window.innerWidth, window.innerHeight);
    }
    _RAF() {
        requestAnimationFrame((t) => {
            if (this.previousRAF === null) {
                this.previousRAF = t;
            }
            this._RAF();
            this.threejs.render(this.scene, this.camera);
            this._Step(t - this.previousRAF);
            this.previousRAF = t;
        });
    }
    _Step(timeElapsed) {
        const timeElapsedS = timeElapsed * 0.001;
        if (this.character) {
            this.character.Update(timeElapsedS);
        }
    }
}
let _APP = null;
window.addEventListener('DOMContentLoaded', () => {
    _APP = new Loader();
});
