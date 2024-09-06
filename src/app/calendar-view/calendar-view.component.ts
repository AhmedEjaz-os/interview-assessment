import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


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
    MatDatepickerModule,
    CdkDropList,
    CdkDrag,
    FormsModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewComponent {
  @ViewChild('datetxt') datetxtEl: ElementRef;
  @ViewChild('dates') datesEl: ElementRef;
  @ViewChild('month_year') monthYearEl: ElementRef;
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  dateObj: any;
  dayName: any;
  month: any;
  year: any;
  date: any;
  SelectedDate: any = null;
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
  datesElement: any;
  monthYearElement: any;
  firtDayOfMonth: any = null;
  lastDateofMonth: any = null;
  lastDayofMonth: any = null;
  lastDateofLastMonth: any = null;
  getDateFromUser: any = [];

  constructor() { }

  ngOnInit() {
    // date object
    this.dateObj = new Date();
    this.dayName = this.dmObj.days[this.dateObj.getDay()]; // day
    this.month = this.dateObj.getMonth(); // month
    this.year = this.dateObj.getFullYear(); // year
    this.date = this.dateObj.getDate(); // dates;
  }

  ngAfterViewInit(): void {
    this.datetxtEl.nativeElement.innerHTML = `${this.dayName},${this.date}, ${this.dmObj.months[this.month]}, ${this.year}`;
    this.datesElement = this.datesEl.nativeElement;
    this.monthYearElement = this.monthYearEl.nativeElement;
    this.monthYearElement.innerHTML = `${this.dmObj.months[this.month]}, ${this.year}`;
    this.displayCalendar();
  }

  prevMonth() {
    this.month = this.month - 1
    if (this.month < 0 || this.month > 11) {
      this.date = new Date(this.year, this.month, new Date().getDate());
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
    } else {
      this.date = new Date();
    }
    this.displayCalendar();
  }

  nextMonth() {
    this.month = this.month + 1
    if (this.month < 0 || this.month > 11) {
      this.date = new Date(this.year, this.month, new Date().getDate());
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
    } else {
      this.date = new Date();
    }
    this.displayCalendar();
  }

  displayCalendar() {
    this.firtDayOfMonth = new Date(this.year, this.month, 1).getDay();
    this.lastDateofMonth = new Date(this.year, this.month + 1, 0)?.getDate();
    this.lastDayofMonth = new Date(this.year, this.month, this.lastDateofMonth)?.getDay();
    this.lastDateofLastMonth = new Date(this.year, this.month, 0)?.getDate();
    let days: any = "";
    let iterator: any = [];
    // previous month last days
    for (let i = this.firtDayOfMonth; i > 0; i--) {
      for (let j = 0; j < this.getDateFromUser.length; j++) {
        if (this.getDateFromUser[j] === `${this.lastDateofLastMonth - i + 1}/${this.month - 1}/${this.year}`) {
          days += `<li class="dummy ${this.lastDateofLastMonth - i + 1}/${this.month - 1}/${this.year}">${this.lastDateofLastMonth - i + 1} ${this.getDateFromUser[j] === `${this.lastDateofLastMonth - i + 1}/${this.month - 1}/${this.year}` ? this.getAppointmentTemplate(`${this.lastDateofLastMonth - i + 1}/${this.month - 1}/${this.year}`) : ''} </li>`;
          iterator.push(i);
        } 
      }
      if (this.getDateFromUser.length <= 0 || (!iterator.includes(i))) {
        days += `<li class="dummy ${this.lastDateofLastMonth - i + 1}/${this.month - 1}/${this.year}">${this.lastDateofLastMonth - i + 1} </li>`;
      }
    }
    iterator = [];
    for (let i = 1; i <= this.lastDateofMonth; i++) {
      let checkToday =
        i === this.dateObj.getDate() &&
          this.month + 1 === new Date().getMonth() + 1 &&
          this.year === new Date().getFullYear()
          ? `active ${i}/${this.month + 1}/${this.year}`
          : `${i}/${this.month + 1}/${this.year}`;
      for (let j = 0; j < this.getDateFromUser.length; j++) {
        if (this.getDateFromUser[j] === `${i}/${this.month + 1}/${this.year}`) {
          days += `<li class="${checkToday}">${i} ${this.getDateFromUser[j] === `${i}/${this.month + 1}/${this.year}` ? this.getAppointmentTemplate(`${i}/${this.month + 1}/${this.year}`) : ''}</li>`;
          iterator.push(i);
        }
      }
      if (this.getDateFromUser.length <= 0 || (!iterator.includes(i))) {
        days += `<li class="${checkToday}">${i}</li>`;
      }
    }
    iterator = [];
    //next month first days
    for (let i = this.lastDayofMonth; i < 6; i++) {
      for (let j = 0; j < this.getDateFromUser.length; j++) {
        if (this.getDateFromUser[j] === `${i - this.lastDayofMonth + 1}/${this.month}/${this.year}`) {
          days += `<li class="dummy ${i - this.lastDayofMonth + 1}/${this.month}/${this.year}">${i - this.lastDayofMonth + 1} ${this.getDateFromUser[j] === `${i - this.lastDayofMonth + 1}/${this.month}/${this.year}` ? this.getAppointmentTemplate(`${i - this.lastDayofMonth + 1}/${this.month}/${this.year}`) : ''}</li>`;
          iterator.push(i);
        }
      }
      if (this.getDateFromUser.length <= 0 || !iterator.includes(i)) {
        days += `<li class="dummy ${i - this.lastDayofMonth + 1}/${this.month}/${this.year}">${i - this.lastDayofMonth + 1}</li>`;
      }
    }
    // display all days inside the HTML file
    this.appendToHtml(days);
  };

  appendToHtml(days: any) {
    this.datesElement.innerHTML = days;
    this.monthYearElement.innerHTML = `${this.dmObj.months[this.month]}, ${this.year}`;
  }

  getAppointmentTemplate(date: any) {
    return `<div class='appointment ${date}' cdkDrag style='padding: 0.5rem;margin: 0.2rem;background-color: #000;border-radius: 5px;color: #fff;'>✅booked</div>`
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onSubmit() {
    if (this.SelectedDate) {
      if (!(this.getDateFromUser.includes(`${this.SelectedDate.getDate()}/${this.SelectedDate.getMonth() + 1}/${this.SelectedDate.getFullYear()}`))) {
        this.getDateFromUser = [
          ...this.getDateFromUser,
          `${this.SelectedDate.getDate()}/${this.SelectedDate.getMonth() + 1}/${this.SelectedDate.getFullYear()}`
        ]
      }
      this.displayCalendar();
    } else {
      this.getDateFromUser = undefined;
    }
  }
}
