import StarrySky from './StarrySky';
import DigitalScroll from './DigitalScroll';

//按需引入
export { StarrySky,DigitalScroll };

const components = [StarrySky,DigitalScroll];

const install = (App) => {
	components.forEach((item) => {
		App.component(item.__name, item);
	});
};

export default { install };
