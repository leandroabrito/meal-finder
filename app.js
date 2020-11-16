const searchInput = document.getElementById('search'),
  submitBtn = document.getElementById('submit'),
  randomBtn = document.getElementById('random'),
  mealsElement = document.getElementById('meals'),
  resultsHeadingElement = document.getElementById('results-heading'),
  singleMealElement = document.getElementById('single-meal');




// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealElement.innerHTML = '';

  // Get search term
  const searchTerm = searchInput.value;

  // Check for empty
  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultsHeadingElement.innerHTML = `<h2>Search results for '${searchTerm}'</h2>`;

        if (data.meals === null) {
          resultsHeadingElement.innerHTML = `<p> There are no search results for this term. Try again!</p>`;
        } else {
          mealsElement.innerHTML = data.meals
          .map(
            meal => `
              <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
                </div>
              </div>
          `)
          .join('');
        }
      });

      // Clear search text
      searchInput.value = '';
  } else {
    alert('Please enter search term');
  }
};


// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(res => res.json())
  .then(data => {
    const meal = data.meals[0];

    addMealToDOM(meal);
  })
}

// Fetch random meal from API
function getRandomMeal() {

  // Clear meals and heading
  mealsElement.innerHTMl = "";
  resultsHeadingElement.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    })
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for(let i = 1; i <= 20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  singleMealElement.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ingredient => `
            <li>${ingredient}</li>
          `)
          .join("")
          }
        </ul>
      </div>
    </div>
  `;
}

// Event listeners
submit.addEventListener('submit', searchMeal);

randomBtn.addEventListener('click', getRandomMeal);

mealsElement.addEventListener('click', e => {
  // const mealInfo = e.path.find(item) => ;
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});


