import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'Home made pizza',
      'https://www.abeautifulplate.com/wp-content/uploads/2015/08/the-best-homemade-margherita-pizza-1-4-600x858.jpg',
      [
        new Ingredient('Dough', 1),
        new Ingredient('Tomato Sauce', 1),
        new Ingredient('Cheese', 4),
        new Ingredient('Spices', 1),

      ]),
    new Recipe('CheeseBurger',
      'Double bacon cheeseburger',
      'https://i.imgur.com/b2m5jqi.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 2),
        new Ingredient('Cheese', 2),
        new Ingredient('Bacon', 3),

      ]),
      new Recipe(
        'Fish & Chips',
        'Original British F&C',
        'https://previews.123rf.com/images/myviewpoint/myviewpoint1703/myviewpoint170300130/74679271-delicious-crispy-fish-and-chips-fried-cod-french-fries-lemon-slices-tartar-sauce-and-mushy-peas-on-p.jpg',
        [
          new Ingredient('Cod', 2),
          new Ingredient('Beer Batter', 1),
          new Ingredient('Chips', 8),
          new Ingredient('Lemmon', 1),
          new Ingredient('Herbs', 1),

  
        ]),
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
