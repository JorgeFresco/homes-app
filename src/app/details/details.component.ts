import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first, last } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./details.component.css'],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}" crossorigin/>
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" formControlName="firstName" type="text" />

          <label for="last-name">Last Name</label>
          <input id="last-name" formControlName="lastName" type="text" />

          <label for="email">Email</label>
          <input id="email" formControlName="email" type="text" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''), 
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation: HousingLocation | undefined) => {
      this.housingLocation = housingLocation;
    }
  )}

  submitApplication() {
    if (this.applyForm.valid) {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
      );
      this.applyForm.reset();
    }
  }
}
