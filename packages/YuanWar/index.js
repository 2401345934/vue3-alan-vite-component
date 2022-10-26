import YuanWar from "./src/yuan-war.vue"

YuanWar.install = (App) => {
	App.component(YuanWar.alanComponentName, YuanWar);
};

export default YuanWar;
