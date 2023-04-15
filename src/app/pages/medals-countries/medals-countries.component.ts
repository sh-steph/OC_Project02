import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-medals-countries',
  templateUrl: './medals-countries.component.html',
  styleUrls: ['./medals-countries.component.scss'],
})
export class MedalsCountriesComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  private ngUnsubscribe = new Subject<void>();
  countriesList: Olympic[] = [];
  joYears: number[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((olympicsData) => {
        // wait to get data from subscribe
        if (olympicsData) {
          this.getCountries(olympicsData);
          this.ngUnsubscribe.next();
          this.ngUnsubscribe.complete();
        }
      });
  }

  getCountries(olympics: Olympic[]) {
    olympics.forEach((countries: Olympic) => {
      this.countriesList.push(<Olympic>{
        id: countries.id,
        country: countries.country,
        participations: countries.participations,
      });
    });
    this.getJOYears();
  }

  getJOYears() {
    if (this.countriesList.length > 0) {
      for (
        let index = 0;
        index < this.countriesList[0].participations.length;
        index++
      ) {
        this.joYears.push(this.countriesList[0].participations[index].year);
      }
    }
  }
}
