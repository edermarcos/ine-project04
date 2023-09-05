import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import mexicoMap from '@highcharts/map-collection/countries/mx/mx-all.geo.json';

MapModule(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  teamColors = {
    NUEVA_ALIANZA: '#00A5AE',
    MORENA: '#B62118',
    PAN: '#01308E',
    PRI: '#00933D',
    PRD: '#FFCC00',
    MOVIMIENTO_CIUDADANO: '#FF8400',
    PT: '#DB2017',
  };
  Highcharts: typeof Highcharts = Highcharts;
  chartMap: Highcharts.Options = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.chartMap = {
      chart: {
        map: mexicoMap,
      },
      title: {
        text: 'Mapa de México',
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },
      legend: {
        enabled: true,
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          const point = this.point as any;
          return `<div class="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
                    <div class="md:flex">
                      <div class="p-4">
                        <div class="capitalize text-sm text-indigo-500">Estado:</div>
                        <p class="block font-medium text-black">${point.name}</p>
                        <div class="mt-4">
                          <div class="capitalize text-sm text-indigo-500">Partido:</div>
                          <p class="">${point.partido}</p>
                        </div>
                        <div class="mt-4">
                          <button class="px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600">Ver Detalle</button>
                        </div>
                      </div>
                    </div>
                  </div>
          `;
        },
      },
      series: [{
        type: 'map',
        name: 'Mexico',
        data: [
          { 'hc-key': 'mx-ag', value: 1, color: this.teamColors.MORENA, partido: 'Morena' },  // Aguascalientes
          { 'hc-key': 'mx-bc', value: 5, color: this.teamColors.PT, partido: 'PT' },  // Baja California
          { 'hc-key': 'mx-bs', value: 3, color: this.teamColors.PRI, partido: 'PRi' },
          { 'hc-key': 'mx-cm', value: 4, color: this.teamColors.PRD, partido: 'PRD' },  // Campeche
          { 'hc-key': 'mx-ch', value: 2, color: this.teamColors.PAN, partido: 'PAN' },  // Chihuahua
          { 'hc-key': 'mx-cl', value: 6, color: this.teamColors.NUEVA_ALIANZA, partido: 'Nueva Alianza' },  // Colima
          { 'hc-key': 'mx-cs', value: 7, color: this.teamColors.MOVIMIENTO_CIUDADANO, partido: 'Movimiento Ciudadano' },  // Chiapas
          { 'hc-key': 'mx-co', value: 8, color: this.teamColors.MOVIMIENTO_CIUDADANO, partido: 'Movimiento Ciudadano' },  // Coahuila
          { 'hc-key': 'mx-df', value: 9, color: this.teamColors.NUEVA_ALIANZA, partido: 'Nueva Alianza' },  // Ciudad de México
          { 'hc-key': 'mx-dg', value: 10, color: this.teamColors.MORENA, partido: 'Morena' }, // Durango
        ],
      }] as any,
    };

    Highcharts.mapChart('container', this.chartMap);
  }
}
