import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  styleUrls: ['./home.component.css'],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location 
        *ngFor="let housingLocation of filteredHousingLocations"
        [housingLocation]="housingLocation">
    </app-housing-location>
    </section>
  `
})

export class HomeComponent {
  housingLocations: HousingLocation[] = [];
  filteredHousingLocations: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocations = housingLocationList;
      this.filteredHousingLocations = housingLocationList;
    })
  }

  filterResults(text: string) {
    if (!text) this.filteredHousingLocations = this.housingLocations; 
    
    this.filteredHousingLocations = this.housingLocations.filter((housingLocation: HousingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
  
}
