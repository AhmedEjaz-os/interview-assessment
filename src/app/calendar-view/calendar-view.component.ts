import { Component } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent {
appointments$: Observable<Appointment[]>;

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.appointments$;
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id);
  }
  onDrop(event: CdkDragDrop<Appointment[]>) {
  const previousIndex = this.appointments$.getValue().findIndex(appointment => appointment === event.item.data);
  moveItemInArray(this.appointments$.getValue(), previousIndex, event.currentIndex);
}

}
