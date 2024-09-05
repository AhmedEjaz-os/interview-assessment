import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
  standalone: true,
  providers: [
    provideNativeDateAdapter()
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewComponent {
  dateObj: any;
  dayName: any;
  month: any;
  year: any;
  date: any;
  datetxtEl: any = document.querySelector("#datetxt");
  dmObj = {
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  datesEl: any = document.querySelectorAll("#dates");
  btnEl: any = document.querySelectorAll("#calendar_headings");
  monthYearEl: any = document.querySelectorAll("#month_year");
  firtDayOfMonth: any = null;
  lastDateofMonth: any = null;
  lastDayofMonth: any = null;
  lastDateofLastMonth: any = null;

  constructor() {}

  ngOnInit() {
    // date object
    this.dateObj = new Date();
    this.dayName = this.dmObj.days[this.dateObj.getDay()]; // day
    this.month = this.dateObj.getMonth(); // month
    this.year = this.dateObj.getFullYear(); // year
    this.date = this.dateObj.getDate(); // dates;
    // today date
    if (this.datetxtEl) {
      this.datetxtEl.innerHTML = `${this.dayName},${this.date}, ${this.dmObj.months[this.month]}, ${this.year}`;
    }
    this.displayCalendar();
    // previous and next month
    this.btnEl.forEach((btns: any) => {
      btns.addEventListener("click", () => {
        this.month = btns.id === "prev" ? this.month - 1 : this.month + 1;
        if (this.month < 0 || this.month > 11) {
          this.date = new Date(this.year, this.month, new Date().getDate());
          this.year = this.date.getFullYear();
          this.month = this.date.getMonth();
        } else {
          this.date = new Date();
        }
        this.displayCalendar();
      });
    });
  }

  displayCalendar() {
    this.firtDayOfMonth = new Date(this.year, this.month, 1).getDay(); // first day of the month
    this.lastDateofMonth = new Date(this.year, this.month + 1, 0)?.getDate(); // last date of the month
    this.lastDayofMonth = new Date(this.year, this.month, this.lastDateofMonth)?.getDay(); // last day of month
    this.lastDateofLastMonth = new Date(this.year, this.month, 0)?.getDate();
    let days = "";
    // previous month last days
    for (let i = this.firtDayOfMonth; i > 0; i--) {
      days += `<li class="dummy">${this.lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= this.lastDateofMonth; i++) {
      let checkToday =
        i === this.dateObj.getDate() &&
          this.month === new Date().getMonth() &&
          this.year === new Date().getFullYear()
          ? "active"
          : "";
      days += `<li class="${checkToday}">${i}</li>`;
    }
    //next month first days
    for (let i = this.lastDayofMonth; i < 6; i++) {
      days += `<li class="dummy">${i - this.lastDayofMonth + 1}</li>`;
    }
    // display all days inside the HTML file
    if (this.datesEl) {
      this.datesEl.innerHTML = days;
    }
    // display current month & year
    this.monthYearEl.innerHTML = `${this.dmObj.months[this.month]}, ${this.year}`;
  };
}
