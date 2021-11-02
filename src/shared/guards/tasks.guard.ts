import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/localStorage.service';

@Injectable({providedIn: 'root'})
export class TasksGuard implements CanActivate {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      if(this.localStorageService.getItem('uid')) {

        return true;
      } else {
        this.router.navigate(['/sign-in']);

        return false;
      } 
    }
}
