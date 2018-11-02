import {ObjectLoader} from 'three';

export default (scene, path, cb) => {
    const loader = new ObjectLoader();

    loader.load(`assets/models/${path}`, obj => {
        switch (path) {
            case `car/car.json`:
                obj.position.y = -15;
                obj.scale.set(15, 15, 15);
                obj.rotation.y = 1;
                break;
            case `couch/couch.json`:
                obj.scale.set(100, 100, 100);
                obj.position.y = -32;
                obj.rotation.y = 3;
                break;

            case `chair/chair.json`:
                obj.scale.set(100, 100, 100);
                obj.position.y = -35;
                obj.rotation.y = 3.4;
                break;
            default:
                break;
        }
        scene.add(obj);
        cb();
    });

    const update = () => false;

    return {
        update
    };
};
