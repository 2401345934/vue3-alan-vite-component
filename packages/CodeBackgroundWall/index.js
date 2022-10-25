import CodeBackgroundWall from './src/code-background-wall.vue';

CodeBackgroundWall.install = (App) => {
	App.component(CodeBackgroundWall.alanComponentName, CodeBackgroundWall);
};

export default CodeBackgroundWall;
