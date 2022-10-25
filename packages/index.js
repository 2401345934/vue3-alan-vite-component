import StarrySky from './StarrySky';
import DigitalScroll from './DigitalScroll';
import Button from './Button';
import "./styles/index.scss"

//按需引入
export { StarrySky,DigitalScroll,Button };

const components = [StarrySky,DigitalScroll,Button];

const install = (App) => {
	components.forEach((item) => {
		App.component(item.__name, item);
	});
};

export default { install };
