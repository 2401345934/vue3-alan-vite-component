import CodeBackgroundWall from './src/code-background-wall.vue';

CodeBackgroundWall.install = (App) => {
  App.component(CodeBackgroundWall.name, CodeBackgroundWall);
};

export default CodeBackgroundWall;
