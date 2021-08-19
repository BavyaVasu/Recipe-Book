import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/Operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if(isAuth){
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    )
  }

}


