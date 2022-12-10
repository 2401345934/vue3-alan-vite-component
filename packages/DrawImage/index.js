import DrawImage from './src/draw-image.vue';

DrawImage.install = (App) => {
  App.component(DrawImage.name, DrawImage);
};

export default DrawImage;
