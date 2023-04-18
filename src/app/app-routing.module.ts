import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/medals-countries/pie-chart/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MedalsCountriesComponent } from './pages/medals-countries/medals-countries.component';
import { PieChartComponent } from './pages/medals-countries/pie-chart/pie-chart.component';
const routes: Routes = [
  {
    path: '',
    component: MedalsCountriesComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
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
