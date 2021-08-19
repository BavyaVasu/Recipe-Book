import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "src/shared/ingredient.model";
import { ShoppinglistService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

  recipeChanged = new Subject<Recipe[]>();

  /*private recipes: Recipe[] = [
    new Recipe('Avocado and Egg Toast','Healthy',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=653&q=80',
    [new Ingredient('Egg', 2),
    new Ingredient('Avocado', 1)]),
    new Recipe('Pancake','Tasty',
    'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
    [new Ingredient('Grape', 5),
    new Ingredient('Banana', 2)])
  ];*/

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppinglistService){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
