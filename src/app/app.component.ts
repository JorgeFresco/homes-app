import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule],
  styleUrls: ['./app.component.css'],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="assets/logo.svg" alt="Logo" aria-hidden="true" />
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
})
export class AppComponent {
  title = 'homes';
}
