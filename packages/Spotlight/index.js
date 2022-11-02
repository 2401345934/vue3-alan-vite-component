import Spotlight from './src/spotlight.vue';

Spotlight.install = (App) => {
	App.component(Spotlight.alanComponentName, Button);
};

export default Spotlight;
