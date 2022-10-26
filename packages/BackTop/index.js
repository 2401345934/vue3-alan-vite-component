import BackTop from "./src/back-top.vue"

BackTop.install = (App) => {
	App.component(BackTop.alanComponentName, BackTop);
};

export default BackTop;
