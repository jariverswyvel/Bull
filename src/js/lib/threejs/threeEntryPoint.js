import SceneManager from './SceneManager';

export default (container, path, cb) => {
    const createCanvas = (document, container) => {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        return canvas;
    };

    const canvas = createCanvas(document, container);
    const bindEventListeners = () => {
        window.onresize = resizeCanvas;
        resizeCanvas();
    };

    const resizeCanvas = () => {
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        sceneManager.onWindowResize();
    };

    const sceneManager = new SceneManager(canvas, path, cb);

    const render = () => {
        requestAnimationFrame(render);
        sceneManager.update();
    };

    bindEventListeners();
    render();
};
