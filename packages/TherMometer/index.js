import TherMometer from "./src/ther-mometer.vue"

TherMometer.install = (App) => {
  App.component(TherMometer.name, TherMometer);
};

export default TherMometer;
