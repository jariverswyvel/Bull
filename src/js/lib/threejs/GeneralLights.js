import {DirectionalLight, HemisphereLight, HemisphereLightHelper, DirectionalLightHelper} from 'three';

export default (scene, {width, height}) => {
    //HEMISPHERE
    const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    const hemiLightHelper = new HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper);

    //DIRECTIONAL
    const dirLightFront = new DirectionalLight(0xffffff, 0.6);
    dirLightFront.color.setHSL(0.1, 1, 0.95);
    dirLightFront.position.set(0, 8, 10);
    dirLightFront.position.multiplyScalar(10);
    dirLightFront.castShadow = true;
    dirLightFront.shadow.mapSize.width = width;
    dirLightFront.shadow.mapSize.height = height;
    const d = 50;
    dirLightFront.shadow.camera.left = -d;
    dirLightFront.shadow.camera.right = d;
    dirLightFront.shadow.camera.top = d;
    dirLightFront.shadow.camera.bottom = -d;
    dirLightFront.shadow.camera.far = 10;
    dirLightFront.shadow.bias = -0.0001;

    scene.add(dirLightFront);
    const dirLightFrontHelper = new DirectionalLightHelper(dirLightFront, 20);
    scene.add(dirLightFrontHelper);

    const dirLightBack = new DirectionalLight(0xffffff, 0.6);
    dirLightBack.color.setHSL(0.1, 1, 0.95);
    dirLightBack.position.set(0, 8, -10);
    dirLightBack.position.multiplyScalar(10);
    dirLightBack.castShadow = true;
    dirLightBack.shadow.mapSize.width = width;
    dirLightBack.shadow.mapSize.height = height;
    dirLightBack.shadow.camera.left = -d;
    dirLightBack.shadow.camera.right = d;
    dirLightBack.shadow.camera.top = d;
    dirLightBack.shadow.camera.bottom = -d;
    dirLightBack.shadow.camera.far = 10;
    dirLightBack.shadow.bias = -0.0001;

    scene.add(dirLightBack);

    const dirLightBackHelper = new DirectionalLightHelper(dirLightBack, 20);
    scene.add(dirLightBackHelper);

    const update = () => scene;

    return {
        update
    };
};
