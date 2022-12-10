import Spotlight from './src/spotlight.vue';

Spotlight.install = (App) => {
  App.component(Spotlight.name, Button);
};

export default Spotlight;
