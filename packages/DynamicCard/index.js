import DynamicCard from './src/dynamic-card.vue';

DynamicCard.install = (App) => {
  App.component(DynamicCard.name, DynamicCard);
};

export default DynamicCard;
