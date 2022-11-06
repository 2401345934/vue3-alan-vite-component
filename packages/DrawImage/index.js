import DrawImage from './src/draw-image.vue';

DrawImage.install = (App) => {
	App.component(DrawImage.alanComponentName, DrawImage);
};

export default DrawImage;
