import YuanWar from "./src/yuan-war.vue"

YuanWar.install = (App) => {
  App.component(YuanWar.name, YuanWar);
};

export default YuanWar;
