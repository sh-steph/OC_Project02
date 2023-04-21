import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  private ngUnsubscribe = new Subject<void>();
  countryFromUrl: string = '';
  numberOfEntries: number = 0;
  totalNumberMedals: number = 0;
  totalNumberOfAthletes: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  ngOnInit() {
    this.getOlympicData();
    const getCountryFromUrl = this.activatedRoute.snapshot.paramMap.get('id');
    // get line chart with url only
    if (getCountryFromUrl) {
      this.countryFromUrl = getCountryFromUrl;
    }
  }

  getOlympicData() {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((olympicsData) => {
        // wait to get data from subscribe
        if (olympicsData) {
          const countryObject = this.getCountryObject(olympicsData);
          // subtitle card data
          this.numberOfEntries = countryObject?.participations.length
            ? countryObject?.participations.length
            : 0;
          this.totalNumberMedals = this.getTotalMedals(countryObject);
          this.totalNumberOfAthletes = this.getTotalOfAthletes(countryObject);

          this.ngUnsubscribe.next();
          this.ngUnsubscribe.complete();
        }
      });
  }

  getCountryObject(olympics: Olympic[]) {
    return olympics.find(
      (olympicStat) => olympicStat.country === this.countryFromUrl
    );
  }

  getTotalMedals(countryObject: Olympic | undefined): number {
    let sum = 0;
    if (countryObject) {
      for (let i = 0; i < countryObject.participations.length; i++) {
        sum += countryObject.participations[i].medalsCount;
      }
      return sum;
    } else {
      return sum;
    }
  }

  getTotalOfAthletes(countryObject: Olympic | undefined): number {
    let sum = 0;
    if (countryObject) {
      for (let i = 0; i < countryObject.participations.length; i++) {
        sum += countryObject.participations[i].athleteCount;
      }
      return sum;
    } else {
      return sum;
    }
  }

  backButton() {
    this.router.navigate(['']);
  }
}
