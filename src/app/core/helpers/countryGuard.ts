import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from '../services/olympic.service';

@Injectable({
  providedIn: 'root',
})
export class CountryGuard implements CanActivate {
  constructor(private olympicService: OlympicService, private router: Router) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const id = activatedRoute.paramMap.get('id');
    return this.olympicService.getCountry(id).pipe(
      map((country) => {
        if (country) {
          return true;
        } else {
          this.router.navigate(['/not-found']);
          return false;
        }
      })
    );
  }
}
