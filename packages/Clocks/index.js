import Clocks from './src/clocks.vue';

Clocks.install = (App) => {
	App.component(Clocks.alanComponentName, Button);
};

export default Clocks;
