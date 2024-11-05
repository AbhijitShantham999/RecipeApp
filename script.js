let app_ctn = document.querySelector("app-container");
let input = document.querySelector("#searchInput");
let btn = document.querySelector("#searchButton");
let recipe_ctn = document.querySelector("#recipeContainer");
let popup = document.querySelector(".popup");

btn.addEventListener("click", () => {
  recipe_ctn.innerHTML = "Loading...";
  async function recipe_card(item) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
    );
    let data = await response.json();

    if (data.meals) {
      recipe_ctn.innerHTML = "";
      data.meals.forEach((meal) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
                      <img src="${meal.strMealThumb}" alt="${meal.strTags}">
                      <div class="recipe-info">
                          <h3>${meal.strMeal}</h3>
                          <p>Type : ${meal.strCategory}</p>
                          <p>Country : ${meal.strArea}</p>
                      </div> 
              `;
        const cardBtn = document.createElement("button");
        cardBtn.classList.add("recipe-button");
        cardBtn.textContent = "Read More";
        recipeCard.appendChild(cardBtn);

        cardBtn.addEventListener("click", () => {
          openPopup(meal);
        });

        recipe_ctn.appendChild(recipeCard);
      });
    } else {
      recipe_ctn.innerHTML = "No Data Found 😭 ✮⋆˙";
    }
  }
  recipe_card(input.value);
});

const fetchIngredients = (meal) => {
  ingredientsList = "";
  for (i = 1; i <= 20; i++) {
    const ingredients = meal[`strIngredient${i}`];
    if (ingredients) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure}${ingredients}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

const openPopup = (meal) => {
  popup.innerHTML = `
          <i id="close-btn" class="ri-close-circle-fill"></i>
          <div class="pop_info">
          <img class="pop_img" src="${meal.strMealThumb}" alt="Recipe Image" />
          <h3>${meal.strMeal}</h3>
          <p class="pop_category">${meal.strCategory}</p>
          <h3 class="popup_ingre">Ingredients:</h3>
          <ul class="popup_ingre">${fetchIngredients(meal)}</ul>
          <p class="pop_desc">${meal.strInstructions}</p>
          <a class="pop_link" href="${
            meal.strYoutube
          }" target="_blank"> <i class="ri-play-fill"></i> Watch Video </a>
        </div>
  `;
  popup.style.display = "block";

  let popupCloseBtn = document.querySelector("#close-btn");
  popupCloseBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
};

// let cardBtns = document.querySelectorAll(".recipe-button");
// cardBtns.forEach((cardBtn) => {
//   cardBtn.addEventListener("click", (data) => {
//     popup.style.display = "block";
//     console.log("clicked");
//     document.querySelector(".pop_img").src = data.meal.strMealThumb;
//     document.querySelector(".pop_desc").textContent =
//       data.meal.strInstructions;
//   });
// });
