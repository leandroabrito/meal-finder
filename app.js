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



// Event listeners
submit.addEventListener('submit', searchMeal);


