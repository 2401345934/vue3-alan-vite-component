import YuanWar from "./src/yuan-war.vue"

YuanWar.install = (App) => {
	App.component(BackTop.alanComponentName, YuanWar);
};

export default YuanWar;
