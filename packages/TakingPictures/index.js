import TakingPictures from './src/taking-pictures.vue';

TakingPictures.install = (App) => {
  App.component(TakingPictures.name, TakingPictures);
};

export default TakingPictures;
