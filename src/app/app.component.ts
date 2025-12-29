import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
    selector: 'app-root',
    imports: [DashboardComponent],
    template: `<app-dashboard></app-dashboard>`,
    standalone: true
})
export class AppComponent { }
