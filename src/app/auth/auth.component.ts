import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../../shared/alert/alert.component";
import { PlaceholderDirective } from "src/shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy{

  private closeSub: Subscription;

  constructor(private authService: AuthService, private route: Router,
    private componentFactoryResolver: ComponentFactoryResolver){}

  isLoginMode = true;
  isLoading = false;
  error:string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm){
    if(!authForm.valid){
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponseData>

    this.isLoading = true;

    if(this.isLoginMode){
      authObservable=this.authService.login(email, password);
    }else{
      authObservable=this.authService.signup(email, password);
    }

    authObservable.subscribe(responseData =>{
      console.log(responseData);
      this.isLoading = false;
      this.route.navigate(['/recipes']);
    }, errorMessage => {

      this.error = errorMessage;
      this.onShowError(errorMessage);
      this.isLoading = false;
    });

    authForm.reset();
  }

  onShowError(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub= componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

  }

  onHandleError(){
     this.error = null;
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
