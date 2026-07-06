package com.housing.tyson.Tyson.housing.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.housing.tyson.Tyson.housing.entity.Booking;
import com.housing.tyson.Tyson.housing.repository.BookingRepository;
import com.housing.tyson.Tyson.housing.service.EmailService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200") // 1. Grants permission to your Angular app
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private EmailService emailService; 

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        // 1. Calculate dynamic tiered cost based on length of stay
        int nights = booking.getTotalNights();
        double nightlyRate;

        if (nights >= 2) {
            nightlyRate = 60.00;  // €60 per night for 2 or more nights
        } else {
            nightlyRate = 70.00;  // €70 for a single night stay
        }

        double totalCost = nights * nightlyRate;
        
        // 2. Save the booking records to PostgreSQL
        Booking savedBooking = bookingRepository.save(booking);
        
        // 3. Trigger email notifications with the calculated price
        try {
            emailService.sendBookingNotifications(savedBooking, totalCost);
        } catch (Exception e) {
            System.err.println("Email failed to dispatch: " + e.getMessage());
        }
        
        return ResponseEntity.ok(savedBooking);
    }
    /**
     * Handles GET requests to fetch all existing bookings
     * This fixes the 405 Method Not Allowed error!
     */
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(bookings);
    }
}