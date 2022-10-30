import StarrySky from './StarrySky'
import DigitalScroll from './DigitalScroll'
import AlanButton from './Button'
import CodeBackgroundWall from "./CodeBackgroundWall"
import AlanBackTop from "./BackTop"
import DynamicCard from "./DynamicCard"
import TherMometer from "./TherMometer"
import YuanWar from "./YuanWar"
import "./styles/index.scss"

//按需引入
export { StarrySky, DigitalScroll, AlanButton, CodeBackgroundWall, AlanBackTop, TherMometer , YuanWar, DynamicCard};

const components = [StarrySky, DigitalScroll, AlanButton, CodeBackgroundWall, AlanBackTop, TherMometer, YuanWar, DynamicCard];

const install = (App) => {
  components.forEach((item) => {
    App.component(item.alanComponentName, item);
  });
};

export default { install };
