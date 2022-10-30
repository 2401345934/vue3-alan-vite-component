import TakingPictures from './src/taking-pictures.vue';

TakingPictures.install = (App) => {
	App.component(TakingPictures.alanComponentName, TakingPictures);
};

export default TakingPictures;
