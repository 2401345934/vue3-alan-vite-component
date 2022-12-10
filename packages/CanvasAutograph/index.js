import CanvasAutograph from "./src/canvas-autograph.vue"

CanvasAutograph.install = (App) => {
  App.component(CanvasAutograph.name, CanvasAutograph);
};

export default CanvasAutograph;
