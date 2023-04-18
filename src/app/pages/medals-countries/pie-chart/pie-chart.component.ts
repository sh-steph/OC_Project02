import {
  Component,
  Input,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
// ChartJs
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})

export class PieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() countriesListFromParent: Olympic[] = [];
  countryList: string[] = [];
  totalMedalList: number[] = [];

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    onClick: (evt, array) => {
      this.getPieIndex(array[0].index);
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        title: {
          padding: 100,
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  //Data
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.countryList,
    datasets: [
      {
        data: this.totalMedalList,
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (
      this.countriesListFromParent &&
      this.countriesListFromParent.length > 0
    ) {
      this.countriesListFromParent.map((c) => {
        this.countryList.push(c.country),
          this.totalMedalList.push(this.getTotalMedalsByCountry(c.country));
      });
    }
    console.log('countries ', this.countryList);
  }

  getTotalMedalsByCountry(country: string): number {
    let totalMedalsCount = 0;
    for (const countryData of this.countriesListFromParent) {
      if (countryData.country === country) {
        for (const participation of countryData.participations) {
          totalMedalsCount += participation.medalsCount;
        }
        break;
      }
    }
    return totalMedalsCount;
  }

  getPieIndex(indexPie: number) {
    if(this.countryList) {
      console.log(this.countryList[indexPie])
      this.router.navigate(['/detail']);
    }
  }
}
