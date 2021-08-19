import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/Operators";
import { AuthService } from "src/app/auth/auth.service";

import { Recipe } from "src/app/recipes/recipe.model";
import { RecipeService } from "src/app/recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
  constructor(private http: HttpClient, private recipeService: RecipeService,
    private authService: AuthService){}

  storeRecipe(){
    const recipe = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-74216-default-rtdb.firebaseio.com/recipes.json',
    recipe).subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipe(){

      return this.http.get<Recipe[]>('https://recipe-book-74216-default-rtdb.firebaseio.com/recipes.json')
    .pipe( map(recipes => {
      return recipes.map( recipe => {
        return {
          ...recipe , ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
    );
  }
}
