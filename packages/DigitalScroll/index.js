import DigitalScroll from './src/digital-scroll.vue';

DigitalScroll.install = (App) => {
  App.component(DigitalScroll.name, DigitalScroll);
};

export default DigitalScroll;
