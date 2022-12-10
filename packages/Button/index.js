import AlanButton from './src/button.vue';

AlanButton.install = (App) => {
  App.component(AlanButton.name, Button);
};

export default AlanButton;
