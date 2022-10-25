import DigitalScroll from './src/digital-scroll.vue';

DigitalScroll.install = (App) => {
	App.component(DigitalScroll.alanComponentName, DigitalScroll);
};

export default DigitalScroll;
