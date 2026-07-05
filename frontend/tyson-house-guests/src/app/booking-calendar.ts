import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';

// Interface representing the booking payload structural match for Spring Boot
interface BookingPayload {
  startDate: Date | null;
  endDate: Date | null;
  totalNights: number | null;
}

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
    provideAnimations() // Eliminates the NG05105 missing animation provider error locally
  ],
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css']
})
export class BookingCalendarComponent implements OnInit {
  // Injecting HTTP Client and specifying the target Spring Boot API endpoint URL
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/bookings';

  bookingForm = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });

  totalNights: number | null = null;
  bookedDates: Date[] = [];

  ngOnInit(): void {
    this.fetchBookedDates();
  }

  /**
   * Fetches previously booked dates from Spring Boot to populate the calendar blockages dynamically
   */
  fetchBookedDates(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (bookings) => {
        // Assuming backend returns an array of bookings with startDate and endDate strings
        const dates: Date[] = [];
        bookings.forEach(booking => {
          const current = new Date(booking.startDate);
          const end = new Date(booking.endDate);
          
          // Populate all dates falling within the reserved range
          while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
        });
        this.bookedDates = dates;
      },
      error: (error) => {
        console.error('Failed to fetch existing bookings from server:', error);
      }
    });
  }

  /**
   * Material Filter to disable past dates and already reserved dates within the UI
   */
  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    
    const time = d.getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Prevent booking past dates
    if (d < today) return false;

    // Prevent booking already taken dates
    return !this.bookedDates.some(bookedDate => {
      // Clear time values to ensure pure date equality check
      const bd = new Date(bookedDate);
      bd.setHours(0, 0, 0, 0);
      return bd.getTime() === time;
    });
  };

  /**
   * Evaluates the selected range updates and computes night length metrics
   */
  onDateRangeSelected(): void {
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

  /**
   * Safety fallback checking to ensure an existing reservation is not inside the user's manual selection range
   */
  checkForInternalBookings(start: Date, end: Date): void {
    const isInvalidSelection = this.bookedDates.some(bookedDate => {
      return bookedDate > start && bookedDate < end;
    });

    if (isInvalidSelection) {
      alert('Oops! Your selected range includes dates that are already booked. Please choose another range.');
      this.bookingForm.reset();
      this.totalNights = null; 
    }
  }

  /**
   * Submits valid booking records downstream to the Spring Boot REST API endpoint
   */
  submitBooking(): void {
    // 1. Grab the strongly-typed raw object values safely
    const formValues = this.bookingForm.getRawValue();

    if (this.bookingForm.valid && this.totalNights !== null) {
      const payload: BookingPayload = {
        startDate: formValues.start,
        endDate: formValues.end,
        totalNights: this.totalNights
      };

      this.http.post<any>(this.apiUrl, payload).subscribe({
        next: (response) => {
          alert('Booking successfully saved to the database!');
          this.bookingForm.reset();
          this.totalNights = null;
          this.fetchBookedDates(); 
        },
        error: (error) => {
          console.error('Error saving booking downstream:', error);
          alert('Could not submit booking application. Check backend connectivity.');
        }
      });
    } else {
      alert('Please select a complete and valid date range before submitting.');
    }
  }
}