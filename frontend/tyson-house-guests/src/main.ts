import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]) // This handles the routing question you answered 'Yes' to earlier
  ]
}).catch((err) => console.error(err));