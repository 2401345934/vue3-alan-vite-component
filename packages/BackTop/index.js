import BackTop from "./src/back-top.vue"

BackTop.install = (App) => {
  App.component(BackTop.name, BackTop);
};

export default BackTop;
