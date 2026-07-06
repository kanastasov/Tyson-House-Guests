import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

// Interface representing the booking payload structural match for Spring Boot
interface BookingPayload {
  guestName: string;   // Added
  guestEmail: string;  // Added
  guestPhone: string;  // Added
  startDate: string | null;
  endDate: string | null;
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
    MatNativeDateModule,
    MatInputModule,
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

  // Fixed: Added user information form controls to resolve the TS2339 properties error
  bookingForm = new FormGroup({
    guestName: new FormControl('', [Validators.required]),
    guestEmail: new FormControl('', [Validators.required, Validators.email]),
    guestPhone: new FormControl('', [Validators.required]),
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });

  totalNights: number | null = null;
  bookedDates: Date[] = [];

  ngOnInit(): void {
    this.fetchBookedDates();
  }

  /**
   * Fetches previously booked dates from Spring Boot and parses them using local time
   */
  fetchBookedDates(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (bookings) => {
        const dates: Date[] = [];
        
        bookings.forEach(booking => {
          if (!booking.startDate || !booking.endDate) return;

          // 1. Break down the string "YYYY-MM-DD" into raw numbers
          const [sYear, sMonth, sDay] = booking.startDate.split('-').map(Number);
          const [eYear, eMonth, eDay] = booking.endDate.split('-').map(Number);

          // 2. Create the dates using your browser's absolute LOCAL time
          const current = new Date(sYear, sMonth - 1, sDay);
          const end = new Date(eYear, eMonth - 1, eDay);
          
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
   * Safe Filter to disable past dates and reserved dates within the UI
   */
  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    
    // Normalize target calendar square to local midnight
    const time = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Prevent booking past dates
    if (d < today) return false;

    // Block the date if it matches any timestamps in our booked list
    return !this.bookedDates.some(bookedDate => {
      const bd = new Date(bookedDate.getFullYear(), bookedDate.getMonth(), bookedDate.getDate());
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

  submitBooking(): void {
    // 1. Grab the strongly-typed raw object values safely
    const formValues = this.bookingForm.getRawValue();

    if (this.bookingForm.valid && this.totalNights !== null) {
      
      // Helper function to safely format local dates into standard YYYY-MM-DD strings
      const formatDateToString = (date: Date | null): string | null => {
        if (!date) return null;
        const localOffsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return localOffsetDate.toISOString().split('T')[0];
      };

      // 2. Map the form values into a timezone-safe payload structure
      const payload: BookingPayload = {
        guestName: formValues.guestName ?? '',   
        guestEmail: formValues.guestEmail ?? '', 
        guestPhone: formValues.guestPhone ?? '', 
        startDate: formatDateToString(formValues.start),
        endDate: formatDateToString(formValues.end),
        totalNights: this.totalNights
      };

      console.log('Sending clean payload to backend:', payload);

      // 3. Post the data to your Spring Boot REST controller
      this.http.post<any>(this.apiUrl, payload).subscribe({
        next: (response) => {
          alert('Booking successfully saved to the database!');
          this.bookingForm.reset();
          this.totalNights = null;
          this.fetchBookedDates(); // Refreshes the calendar to block out the new dates immediately!
        },
        error: (error) => {
          console.error('Error saving booking downstream:', error);
          alert('Could not submit booking application. Check backend connectivity.');
        }
      });
    } else {
      alert('Please fill out your personal information and select a complete date range before submitting.');
    }
  }
}