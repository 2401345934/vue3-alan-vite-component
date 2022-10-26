import TherMometer from "./src/ther-mometer.vue"

TherMometer.install = (App) => {
	App.component(BackTop.alanComponentName, TherMometer);
};

export default TherMometer;
