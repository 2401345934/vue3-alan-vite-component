import StarrySky from './src/starry-sky.vue';

StarrySky.install = (App) => {
  App.component(StarrySky.name, StarrySky);
};

export default StarrySky;
