import { Routes } from '@angular/router';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component.ts'
import { CalendarViewComponent } from './calendar-view/calendar-view.component.ts'

export const routes: Routes = [
	{ path: '/', component: CalendarViewComponent }
	{ path: '/form', component: AppointmentFormComponent }
];
