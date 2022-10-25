import Button from './src/button.vue';

Button.install = (App) => {
	App.component(Button.__name, Button);
};

export default Button;
