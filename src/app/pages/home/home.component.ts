import { Component, OnInit } from '@angular/core';
import { Observable, count, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
   countriesList: Olympic[] = [];
   joYears: number[] = []

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((olympicsData) => {
      if (olympicsData) {
        this.getCountries(olympicsData);
      }
    });
  }

  getCountries(olympics: any) {
    console.log('opo', olympics);
    olympics.forEach((countries: Olympic) => {
      this.countriesList.push(<Olympic>{
        id: countries.id,
        country: countries.country,
        participations: countries.participations
      })
      console.log('data ', this.countriesList[0].participations)
    });
    this.getJOYears();
  }

  getJOYears() {
    if (this.countriesList.length > 0) {
      for (let index = 0; index < this.countriesList[0].participations.length; index++) {
        this.joYears.push(this.countriesList[0].participations[index].year)
      }
      console.log(this.joYears)
    }
  }
}
