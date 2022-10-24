import StarrySky from './src/starry-sky.vue';

StarrySky.install = (App) => {
	App.component(StarrySky.__name, StarrySky);
};

export default StarrySky;
