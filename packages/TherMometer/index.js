import TherMometer from "./src/ther-mometer.vue"

TherMometer.install = (App) => {
	App.component(TherMometer.alanComponentName, TherMometer);
};

export default TherMometer;
