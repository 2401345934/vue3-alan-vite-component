import RedPacketRain from "./src/red-packet-rain.vue"

RedPacketRain.install = (App) => {
  App.component(RedPacketRain.name, RedPacketRain);
};

export default RedPacketRain;
