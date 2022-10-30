import DynamicCard from './src/dynamic-card.vue';

DynamicCard.install = (App) => {
	App.component(DynamicCard.alanComponentName, DynamicCard);
};

export default DynamicCard;
