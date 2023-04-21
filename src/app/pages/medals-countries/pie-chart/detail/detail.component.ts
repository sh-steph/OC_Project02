import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
// line chart
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
  yearsList: number[] = [];
  medalsList: number[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Medals',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit() {
    const getCountryFromUrl = this.activatedRoute.snapshot.paramMap.get('id');
    // get line chart with url only
    if (getCountryFromUrl) {
      this.countryFromUrl = getCountryFromUrl;
      this.getOlympicData();
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
          this.getyearsList(countryObject);
          this.getmedalsList(countryObject);
          this.updateChartData();
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

  getyearsList(countryObject: Olympic | undefined) {
    if (countryObject) {
      countryObject.participations.map((data) => {
        this.yearsList.push(data.year);
      });
    }
  }

  getmedalsList(countryObject: Olympic | undefined) {
    if (countryObject) {
      countryObject.participations.map((data) => {
        this.medalsList.push(data.medalsCount);
      });
    }
  }

  backButton() {
    this.router.navigate(['']);
  }

  updateChartData() {
    this.lineChartData = {
      datasets: [
        {
          data: this.medalsList,
          label: 'Medals',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      labels: this.yearsList,
    };
  }
}
