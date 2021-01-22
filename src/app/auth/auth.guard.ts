import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

}
