import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppinglistService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredient[] ;
  private igchangeSub: Subscription;

  constructor(private shoppingListService: ShoppinglistService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igchangeSub=this.shoppingListService.ingChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number){
    this.shoppingListService.startedEdit.next(index);
  }

  ngOnDestroy(){
    this.igchangeSub.unsubscribe();
  }



}
