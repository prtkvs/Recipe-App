const searchBox = document.querySelector('.searchBox') ;
const searchBtn = document.querySelector('.searchBtn') ;
const recipeContainer = document.querySelector('.recipe-container') ; //shift+alt+down key to copy and put in down side
const recipeDetailsContent = document.querySelector('.recipe-details-content') ;
const recipeCloseBtn = document.querySelector('.recipe-close-btn') ;


//Function to get recipes
const fetchRecipes = async (query)=>{
    recipeContainer.innerHTML= "<h2>Fetching Recipes...</h2>";
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`); //remember to put https:// 
    const response = await data.json();
    //console.log(response.meals[0]);

    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>  
        `
        const button = document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);

        //adding event listener to recipe button
        button.addEventListener("click",()=>{
            openRecipePopup(meal);
        }); 
        recipeContainer.appendChild(recipeDiv);
    });
}
catch(error){
    recipeContainer.innerHTML= "<h2>Error in Fetching Recipes...(Recipe Not Found)</h2>";

}
}
//function to fetch ingredients and measurements
const fetchIngredients = (meal)=>{
    //console.log(meal);  //to check how many are there + extra information
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML= `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
    <div class = "recipeinstructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
}
 recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
 });
//press log and enter to write console.log();
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault(); //to stop auto refreshing and quick submit
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});