import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup
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
    MatButtonModule,
    CdkDropListGroup
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewComponent {
  @ViewChild('datetxt') datetxtEl: ElementRef;
  @ViewChild('dates') datesEl: ElementRef;
  @ViewChild('month_year') monthYearEl: ElementRef;
  @ViewChild('appointment') appointment: ElementRef;
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
    let iterator = 1;

    for (let i = this.firtDayOfMonth; i > 0; i--) {
      let item: any = document.querySelectorAll(`#dateElement${iterator}`);
      let appointmentTemplate: any = document.querySelector(`#appointmentTemplate${iterator}`);
      let dateParent: any = document.querySelectorAll(`#dateElementParent${iterator}`);
      if (dateParent[0]) {
        dateParent[0].classList.remove(`${dateParent[0].classList[2]}`);
        dateParent[0].classList.add(`${this.lastDateofLastMonth - i + 1}/${this.month - 1}/${this.year}`);
      } 
      item[0].innerHTML = `${this.lastDateofLastMonth - i + 1}`;
      item[0].classList.remove("active");
      item[0].classList.add('dummy');
      if (appointmentTemplate[0]) {
        appointmentTemplate[0].style.display = this.getDateFromUser.includes(`${this.lastDateofLastMonth - i + 1}/${this.month - 1}/${this.year}`) ? 'block' : 'none';
      }
      iterator += 1;
    }
    for (let i = 1; i <= this.lastDateofMonth; i++) {
      let item: any = document.querySelectorAll(`#dateElement${iterator}`);
      let appointmentTemplate: any = document.querySelectorAll(`#appointmentTemplate${iterator}`);
      let dateParent: any = document.querySelectorAll(`#dateElementParent${iterator}`);
      if (dateParent[0]) {
        dateParent[0].classList.remove(`${dateParent[0].classList[2]}`);
        dateParent[0].classList.add(`${i}/${this.month}/${this.year}`);
      }
      item[0].innerHTML = `${i}`;
      item[0].classList.remove("dummy");
      if (i === this.dateObj.getDate() &&
        this.month === new Date().getMonth() &&
        this.year === new Date().getFullYear()) {
          item[0].classList.add('active');
      } else {
        item[0].classList.remove("active");
      }
      if (appointmentTemplate[0]) {
        appointmentTemplate[0].style.display = this.getDateFromUser.includes(`${i}/${this.month}/${this.year}`) ? 'block' : 'none';
      }
      iterator += 1;
    }
    //next month first days
    for (let i = this.lastDayofMonth; i < 6; i++) {
      let item: any = document.querySelectorAll(`#dateElement${iterator}`);
      let appointmentTemplate: any = document.querySelector(`#appointmentTemplate${iterator}`);
      let dateParent: any = document.querySelectorAll(`#dateElementParent${iterator}`);
      if (dateParent[0]) {
        dateParent[0].classList.remove(`${dateParent[0].classList[2]}`);
        dateParent[0].classList.add(`${i - this.lastDayofMonth + 1}/${this.month + 1}/${this.year}`);
      }
      item[0].innerHTML = `${i - this.lastDayofMonth + 1}`;
      item[0].classList.remove("active");
      item[0].classList.add('dummy');
      console.log(this.getDateFromUser.includes(`${i - this.lastDayofMonth + 1}/${this.month + 1}/${this.year}`));
      if (appointmentTemplate[0]) {
        appointmentTemplate[0].style.display = this.getDateFromUser.includes(`${i - this.lastDayofMonth + 1}/${this.month + 1}/${this.year}`) ? 'block' : 'none';
      }
      iterator += 1;
    }
    // display all days inside the HTML file
    this.monthYearElement.innerHTML = `${this.dmObj.months[this.month]}, ${this.year}`;
  };

  drop(event: CdkDragDrop<string[]>) {
    if (!(this.getDateFromUser.includes(`${event.container.element.nativeElement.classList[2]}`))) {
      this.getDateFromUser = [...this.getDateFromUser.filter((element: any) => element !== `${event.previousContainer.element.nativeElement.classList[2]}`), `${event.container.element.nativeElement.classList[2]}`];
      this.displayCalendar();
    }
  }

  onSubmit() {
    if (this.SelectedDate) {
      if (!(this.getDateFromUser.includes(`${this.SelectedDate.getDate()}/${this.SelectedDate.getMonth()}/${this.SelectedDate.getFullYear()}`))) {
        this.getDateFromUser = [
          ...this.getDateFromUser,
          `${this.SelectedDate.getDate()}/${this.SelectedDate.getMonth()}/${this.SelectedDate.getFullYear()}`
        ]
        this.displayCalendar();
      }
    } else {
      this.getDateFromUser = undefined;
    }
  }
}