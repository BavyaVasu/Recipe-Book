import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/shared/shared.module";

import { AuthComponent } from '../auth/auth.component';


@NgModule({
  declarations:[
    AuthComponent
  ],
  imports:[
    FormsModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent }
    ]),
    SharedModule
  ]
})
export class AuthModule{}
