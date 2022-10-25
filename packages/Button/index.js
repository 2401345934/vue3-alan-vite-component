import AlanButton from './src/button.vue';

AlanButton.install = (App) => {
	App.component(AlanButton.alanComponentName, Button);
};

export default AlanButton;
