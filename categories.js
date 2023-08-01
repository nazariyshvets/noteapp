//the list of predefined categories with names and Font Awesome icons
const categories = [
  { name: "Task", icon: '<i class="fa-solid fa-cart-shopping icon"></i>' },
  { name: "Random Thought", icon: '<i class="fa-solid fa-gears icon"></i>' },
  { name: "Idea", icon: '<i class="fa-solid fa-lightbulb icon"></i>' },
];

function getCategoryIcon(categoryName) {
  return (
    categories.find((category) => category.name === categoryName)?.icon || ""
  );
}

export { categories, getCategoryIcon };
