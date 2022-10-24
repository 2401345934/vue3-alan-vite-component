import DigitalScroll from './src/digital-scroll.vue';

DigitalScroll.install = (App) => {
	App.component(DigitalScroll.__name, DigitalScroll);
};

export default DigitalScroll;
