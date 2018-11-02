import {Scene, WebGLRenderer, PerspectiveCamera, Clock, Vector3} from 'three';
import OrbitControls from 'orbit-controls-es6';
import SphereSubject from './SphereSubject';
import GeneralLights from './GeneralLights';

export default (canvas, path, cb) => {
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };

    const clock = new Clock();
    const origin = new Vector3(0, 0, 0);
    let controls;

    const buildScene = () => {
        const scene = new Scene();

        return scene;
    };

    const buildRender = ({width, height}) => {
        const renderer = new WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    };

    const buildCamera = ({width, height}) => {
        const aspectRatio = width / height;
        const fieldOfView = 30;
        const nearPlane = 1;
        const farPlane = 5000;
        const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.set(0, 60, 250);
        camera.lookAt(origin);

        controls = new OrbitControls(camera, canvas);
        controls.enabled = true;
        controls.maxDistance = 500;
        controls.minDistance = 50;
        controls.rotateSpeed = 0.8;

        return camera;
    };

    const createSceneSubjects = scene => {
        const sceneSubjects = [new SphereSubject(scene, path, cb), new GeneralLights(scene, screenDimensions)];

        return sceneSubjects;
    };

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    const update = () => {
        const elapsedTime = clock.getElapsedTime();

        for (let i = 0; i < sceneSubjects.length; i++) sceneSubjects[i].update(elapsedTime);

        renderer.render(scene, camera);
    };

    const onWindowResize = () => {
        const {width, height} = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    };

    return {
        update,
        onWindowResize
    };
};
