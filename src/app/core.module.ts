import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShoppinglistService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
  providers:[
    ShoppinglistService, RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ]
})

export class CoreModule{}
