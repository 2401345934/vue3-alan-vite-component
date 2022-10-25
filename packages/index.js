import StarrySky from './StarrySky';
import DigitalScroll from './DigitalScroll';
import AlanButton from './Button';
import "./styles/index.scss"

//按需引入
export { StarrySky,DigitalScroll,AlanButton };

const components = [StarrySky,DigitalScroll,AlanButton];

const install = (App) => {
	components.forEach((item) => {
		App.component(item.alanComponentName, item);
	});
};

export default { install };
