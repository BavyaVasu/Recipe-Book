import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DataStorageService } from "src/shared/data-storage.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector:'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit , OnDestroy{

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  private userSub: Subscription;
  isAuthenticated = false;

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
    });

  }

  onSaveData(){
    this.dataStorageService.storeRecipe();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipe().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
