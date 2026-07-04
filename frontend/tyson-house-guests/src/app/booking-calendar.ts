import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-calendar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css']
})
export class BookingCalendarComponent {
  // 1. Set up the form group
  bookingForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // 2. Mock data: Dates that are already booked by other guests
  // (Later, this will come from your backend API)
  bookedDates = [
    new Date(2026, 6, 10), // July 10, 2026 (Note: Months are 0-indexed, so 6 = July)
    new Date(2026, 6, 11),
    new Date(2026, 6, 12),
    new Date(2026, 6, 20),
    new Date(2026, 6, 21),
  ];

  // 3. The Filter Function
  // Angular Material runs this function for EVERY day on the calendar.
  // If it returns false, that day becomes unclickable.
  dateFilter = (d: Date | null): boolean => {
    const time = d?.getTime();
    
    // Prevent booking past dates
    const today = new Date();
    today.setHours(0,0,0,0);
    if (d && d < today) return false;

    // Prevent booking already taken dates
    return !this.bookedDates.some(bookedDate => bookedDate.getTime() === time);
  };

  // 4. Submit the booking
  submitBooking() {
    if (this.bookingForm.valid) {
      console.log('Booking requested:', this.bookingForm.value);
      // This is where you will eventually call your backend API
    }
  }
}