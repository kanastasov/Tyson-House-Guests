import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations'; // 1. Import this

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
  providers: [
    provideAnimations() // 2. Add this here to completely eliminate the NG05105 error locally
  ],
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css']
})
export class BookingCalendarComponent {
  bookingForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // Track the number of nights selected to bind to your template UI
  totalNights: number | null = null;

  bookedDates = [
    new Date(2026, 6, 10), // July 10, 2026
    new Date(2026, 6, 11),
    new Date(2026, 6, 12),
    new Date(2026, 6, 20),
    new Date(2026, 6, 21),
  ];

  dateFilter = (d: Date | null): boolean => {
    const time = d?.getTime();
    
    // Prevent booking past dates
    const today = new Date();
    today.setHours(0,0,0,0);
    if (d && d < today) return false;

    // Prevent booking already taken dates
    return !this.bookedDates.some(bookedDate => bookedDate.getTime() === time);
  };

  onDateRangeSelected() {
    const start = this.bookingForm.value.start;
    const end = this.bookingForm.value.end;

    if (start && end) {
      console.log('--- Date Range Complete ---');
      console.log('Check-in:', start);
      console.log('Check-out:', end);

      const timeDiff = end.getTime() - start.getTime();
      this.totalNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      console.log(`Total nights selected: ${this.totalNights}`);
      
      this.checkForInternalBookings(start, end);
    } else {
      this.totalNights = null;
    }
  }

  checkForInternalBookings(start: Date, end: Date) {
    const isInvalidSelection = this.bookedDates.some(bookedDate => {
      return bookedDate > start && bookedDate < end;
    });

    if (isInvalidSelection) {
      alert('Oops! Your selected range includes dates that are already booked. Please choose another range.');
      this.bookingForm.reset();
      this.totalNights = null; 
    }
  }

  submitBooking() {
    if (this.bookingForm.valid) {
      console.log('Booking requested:', this.bookingForm.value, 'Total Nights:', this.totalNights);
    }
  }
}