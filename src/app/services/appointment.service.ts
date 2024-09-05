import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export interface Appointment {
  id: number;
  title: string;
  date: Date;
  description: string;
}
export class AppointmentService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this.appointmentsSubject.asObservable();

  private appointments: Appointment[] = [];

  addAppointment(appointment: Appointment) {
    this.appointments.push(appointment);
    this.appointmentsSubject.next([...this.appointments]);
  }

  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter(app => app.id !== id);
    this.appointmentsSubject.next([...this.appointments]);
  }

  updateAppointment(id: number, updatedAppointment: Appointment) {
    const index = this.appointments.findIndex(app => app.id === id);
    if (index > -1) {
      this.appointments[index] = updatedAppointment;
      this.appointmentsSubject.next([...this.appointments]);
    }
  }
}

