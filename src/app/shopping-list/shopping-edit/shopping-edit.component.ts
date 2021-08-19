import { formatCurrency } from '@angular/common';
import { EventEmitter, OnDestroy, Output } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('f') slForm: NgForm;

  subcription: Subscription;
  editMode=false;
  editedIndex: number;
  editedItem: Ingredient;
  //@ViewChild('nameInput') nameInputRef: ElementRef;
  //@ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private slService: ShoppinglistService) { }

  ngOnInit(): void {
    this.subcription=this.slService.startedEdit.subscribe(
      (index: number)=>{
        this.editMode=true;
        this.editedIndex=index;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  /*onAdd(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmount);
    this.slService.addIngredient(newIngredient);
  }*/

  onAdd(form: NgForm){
    const value= form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedIndex, newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();

  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

}
