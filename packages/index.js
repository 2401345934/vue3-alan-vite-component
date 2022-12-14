import StarrySky from './StarrySky'
import DigitalScroll from './DigitalScroll'
import AlanButton from './Button'
import CodeBackgroundWall from "./CodeBackgroundWall"
import AlanBackTop from "./BackTop"
import DynamicCard from "./DynamicCard"
import TakingPictures from "./TakingPictures"
import TherMometer from "./TherMometer"
import YuanWar from "./YuanWar"
import Clocks from "./Clocks"
import VideoRecording from "./VideoRecording"
import Spotlight from "./Spotlight"
import DrawImage from "./DrawImage"
import CanvasAutograph from './CanvasAutograph'
import RedPacketRain from "./RedPacketRain"
import Utils from "./Utils"
import "./styles/index.scss"

//按需引入
export { StarrySky, DigitalScroll, AlanButton, CodeBackgroundWall, AlanBackTop, TherMometer, YuanWar, DynamicCard, TakingPictures, VideoRecording, Clocks, Spotlight, DrawImage, CanvasAutograph, RedPacketRain, Utils };

const components = [StarrySky, DigitalScroll, AlanButton, CodeBackgroundWall, AlanBackTop, TherMometer, YuanWar, DynamicCard, TakingPictures, VideoRecording, Clocks, Spotlight, DrawImage, CanvasAutograph, RedPacketRain];

const install = (App) => {
  components.forEach((item) => {
    App.component(item.name, item);
  });
};

export default { install, Utils };
