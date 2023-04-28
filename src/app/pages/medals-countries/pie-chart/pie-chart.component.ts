import { Component, Input, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';
import { DataFromChartClick } from 'src/app/core/models/DataFromChartClick';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() countriesListFromParent: Olympic[] = [];
  countriesList: string[] = [];
  totalMedalList: number[] = [];
  indexPie: number = 0;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
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
    onClick: (evt, array) => {
      this.getPieIndex(array[0].index);
    },
  };
  //Data
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.countriesList,
    datasets: [
      {
        data: this.totalMedalList,
        backgroundColor: [
          '#946166',
          '#6FC8CE',
          '#B9CCE6',
          '#C0E0F0',
          '#9781A0',
          '#8AA2D9',
          '783E52',
        ],
        hoverBackgroundColor: [
          '#946166',
          '#6FC8CE',
          '#B9CCE6',
          '#C0E0F0',
          '#9781A0',
          '#8AA2D9',
          '783E52',
        ],
        borderColor: [
          '#946166',
          '#6FC8CE',
          '#B9CCE6',
          '#C0E0F0',
          '#9781A0',
          '#8AA2D9',
          '783E52',
        ],
        hoverBorderColor: [
          '#946166',
          '#6FC8CE',
          '#B9CCE6',
          '#C0E0F0',
          '#9781A0',
          '#8AA2D9',
          '783E52',
        ],
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
        this.countriesList.push(c.country),
          this.totalMedalList.push(this.getTotalMedalsByCountry(c.country));
      });
    }
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
    this.indexPie = indexPie;
  }

  chartHovered(e: DataFromChartClick): void {
    if (e.event.type == 'click') {
      const clickedIndex = e.active[0]?.index;
      if (this.countriesList && clickedIndex !== undefined) {
        const country = this.countriesList[clickedIndex];
        this.router.navigate([country, 'detail']);
      }
    }
  }
}
