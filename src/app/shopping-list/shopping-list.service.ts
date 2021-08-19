
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';

export class ShoppinglistService{
  //ingChanged = new EventEmitter<Ingredient[]>()
  ingChanged = new Subject<Ingredient[]>();
  startedEdit =new Subject<number>();

  private ingredients:Ingredient[] = [
    new Ingredient('Apple',5),
    new Ingredient('Onion',10)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index, 1);
    this.ingChanged.next(this.ingredients.slice());
  }

}
