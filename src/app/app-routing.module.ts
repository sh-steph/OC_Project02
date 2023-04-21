import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './pages/medals-countries/pie-chart/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CountryGuard } from './core/helpers/countryGuard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':id/detail',
    component: DetailComponent,
    canActivate: [CountryGuard],
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
